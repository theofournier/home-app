"use client";

import { compressPhoto } from "@/lib/utils/compressPhoto";
import { uploadPhoto } from "@/lib/utils/uploadPhoto";
import { Button } from "@nextui-org/button";
import { useState } from "react";

const mimeToExtension: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
};

type Props = {
  id: string;
  url: string;
  title?: string;
};

export const CompressPhoto = ({ id, url, title }: Props) => {
  const [state, setState] = useState({
    loading: false,
    successMessage: "",
    errorMessage: "",
  });

  const handleCompressPhoto = async () => {
    setState({
      loading: true,
      successMessage: "",
      errorMessage: "",
    });
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File(
        [blob],
        `${title?.replaceAll(" ", "-")}.${
          mimeToExtension[blob.type] || "unknown"
        }`,
        {
          type: blob.type,
        }
      );
      const compressFile = await compressPhoto(file);
      if (!compressFile) {
        setState({
          loading: false,
          successMessage: "",
          errorMessage: "Error while compressing",
        });
      }
      const compressResult = await uploadPhoto(compressFile, "compressed");
      if (!compressResult.ok) {
        setState({
          loading: false,
          successMessage: "",
          errorMessage: `Error while uploading: ${compressResult.reason}`,
        });
      }
      const photoResponse = await fetch(`/api/photos/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          urlCompress: compressResult.url,
        }),
      });
      setState({
        loading: false,
        successMessage: photoResponse.ok
          ? "Successfully compressed and uploaded"
          : "",
        errorMessage: !photoResponse.ok ? "Error while updating" : "",
      });
    } catch (e) {
      console.log(e);
      setState({
        loading: false,
        successMessage: "",
        errorMessage: (e as Error).message,
      });
    }
  };

  return (
    <div>
      <Button
        type="button"
        color="primary"
        isLoading={state.loading}
        onPress={handleCompressPhoto}
      >
        Compress photo
      </Button>

      {state.errorMessage && (
        <p className="text-danger">{state.errorMessage}</p>
      )}
      {state.successMessage && (
        <p className="text-success">{state.successMessage}</p>
      )}
    </div>
  );
};

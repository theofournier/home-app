"use client";

import { Photo } from "@/lib/supabase/types";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useState } from "react";
import NextImage from "next/image";
import { Card } from "@nextui-org/card";

type Props = {
  photos: Photo[];
};

export const Gallery = ({ photos }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const onPressPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
    onOpen();
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            className="relative w-full h-96"
            radius="none"
            isPressable
            onPress={() => onPressPhoto(photo)}
          >
            <NextImage
              fill
              alt={photo.title ?? photo.id}
              sizes="100vw"
              src={photo.url}
              style={{
                objectFit: "cover",
              }}
            />
          </Card>
        ))}
      </div>
      <Modal isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                {selectedPhoto ? (
                  <NextImage
                    alt={selectedPhoto.title ?? selectedPhoto.id}
                    src={selectedPhoto.url}
                    height={500}
                    width={500}
                  />
                ) : (
                  <p>No selected photo</p>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

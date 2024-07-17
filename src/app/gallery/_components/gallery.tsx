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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            className="h-96"
            radius="none"
            isPressable
            onPress={() => onPressPhoto(photo)}
          >
            <NextImage
              alt={photo.title ?? photo.id}
              src={photo.url}
              height={photo.height}
              width={photo.width}
            />
          </Card>
        ))}
      </div>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        onOpenChange={onOpenChange}
        placement="center"
        size="5xl"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {selectedPhoto?.title}
              </ModalHeader>
              <ModalBody>
                {selectedPhoto ? (
                  <NextImage
                    alt={selectedPhoto.title ?? selectedPhoto.id}
                    src={selectedPhoto.url}
                    height={selectedPhoto.height}
                    width={selectedPhoto.width}
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

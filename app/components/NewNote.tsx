import {
  Button,
  Modal,
  ModalContent,
  useDisclosure,
  ModalFooter,
  Kbd,
  Input,
} from "@nextui-org/react";
import { IconSquareRoundedPlusFilled } from "@tabler/icons-react";

export default function NewNote() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="-mt-2 flex items-center gap2-5">
      <IconSquareRoundedPlusFilled size={14} />
      <Button
        onPress={onOpen}
        className="bg-8000 text-neutral-400 flex justify-start -ml-3 w-[200px]"
      >
        New Page
      </Button>
      <Modal
        size="2xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="fixed top-10"
      >
        <ModalContent className="flex flex-col items-center sidebar">
          {(onClose) => (
            <>
              <Input
                color="default"
                variant="underlined"
                autoFocus
                label="Title"
                className="w-[90%]"
              ></Input>
              <ModalFooter className="text-xs">
                <p>
                  Press <Kbd className="text-xs">Esc</Kbd> to close.
                </p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

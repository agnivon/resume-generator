import { ListItem } from "@/components/global/ListGroup";
import Modal, { ModalProps, ModalSize } from "@/components/global/modal/Modal";
import ModalBody from "@/components/global/modal/ModalBody";
import ModalHeader from "@/components/global/modal/ModalHeader";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

type ListItemSequenceChangeModalProps<T> = ModalProps & {
  items: T[];
  idExtractor: (entity: T) => string;
  itemRenderer: (entity: T) => React.ReactNode;
  onDragEnd: OnDragEndResponder;
};

export default function ListItemSequenceChangeModal<T>(
  props: ListItemSequenceChangeModalProps<T>
) {
  const { items, idExtractor, itemRenderer, onDragEnd } = props;
  return (
    <Modal dismissible={true} size={ModalSize.DEFAULT} {...props}>
      <ModalHeader>Change Sequence</ModalHeader>
      <ModalBody>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sequenceChangeList">
            {(provided) => {
              return (
                <div
                  className="w-full text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {items.map((item, idx) => {
                    const id = `${idExtractor(item)}-${idx}`;
                    return (
                      <Draggable draggableId={id} key={id} index={idx}>
                        {(provided) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="w-80"
                            >
                              <ListItem
                                label={id}
                                content={itemRenderer(item)}
                                first={idx === 0}
                                last={idx === items.length - 1}
                              />
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </ModalBody>
    </Modal>
  );
}

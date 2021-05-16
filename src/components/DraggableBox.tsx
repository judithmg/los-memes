import { CSSProperties, FC, memo, useEffect } from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { ItemTypes } from "../interfaces/ItemTypes";
import { getEmptyImage } from "react-dnd-html5-backend";
import Box from "./Box";

function getStyles(
  left: number,
  top: number,
  isDragging: boolean
): CSSProperties {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: "absolute",
    transform,
    WebkitTransform: transform,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : "",
  };
}

export interface DraggableBoxProps {
  id: string;
  left: number;
  top: number;
}

export const DraggableBox: FC<DraggableBoxProps> = memo(function DraggableBox(
  props
) {
  const { id, left, top } = props;
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div ref={drag} style={getStyles(left, top, isDragging)}>
      <Box />
    </div>
  );
});

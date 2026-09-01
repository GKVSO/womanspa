import { useEffect, RefObject } from "react";

export function useDraggableScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const ele = ref.current;
    if (!ele) return;

    let isDown = false;
    let isDragging = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      isDragging = false;
      ele.style.cursor = 'grabbing';
      ele.style.userSelect = 'none';
      startX = e.pageX - ele.offsetLeft;
      scrollLeft = ele.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      ele.style.cursor = 'grab';
      ele.style.removeProperty('user-select');
    };

    const onMouseUp = () => {
      isDown = false;
      ele.style.cursor = 'grab';
      ele.style.removeProperty('user-select');
      // Delay resetting isDragging so click event can be blocked
      setTimeout(() => {
        isDragging = false;
      }, 0);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - ele.offsetLeft;
      const walk = (x - startX) * 2;
      if (Math.abs(walk) > 5) {
        isDragging = true;
      }
      ele.scrollLeft = scrollLeft - walk;
    };

    const onDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    const onClickCapture = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    ele.style.cursor = 'grab';
    ele.addEventListener("mousedown", onMouseDown);
    ele.addEventListener("mouseleave", onMouseLeave);
    ele.addEventListener("mouseup", onMouseUp);
    ele.addEventListener("mousemove", onMouseMove);
    ele.addEventListener("dragstart", onDragStart);
    ele.addEventListener("click", onClickCapture, true);

    return () => {
      ele.removeEventListener("mousedown", onMouseDown);
      ele.removeEventListener("mouseleave", onMouseLeave);
      ele.removeEventListener("mouseup", onMouseUp);
      ele.removeEventListener("mousemove", onMouseMove);
      ele.removeEventListener("dragstart", onDragStart);
      ele.removeEventListener("click", onClickCapture, true);
    };
  }, [ref]);
}

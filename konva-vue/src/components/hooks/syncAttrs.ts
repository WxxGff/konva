import { useAttrs, watch } from "vue";
import Konva from "konva";

/*
 * 同步 attrs
 * */
export const syncAttrs = (konvaNode: Konva.Shape | Konva.Layer) => {
  const attrs = useAttrs();
  watch(
    () => attrs,
    () => {

    /*setAttrs(config)
         set multiple attrs at once using an object literal */

      konvaNode.setAttrs(attrs);

    },
    { deep: true, immediate: true },
  );
};

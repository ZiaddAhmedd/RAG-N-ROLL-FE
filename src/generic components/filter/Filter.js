import React from "react";
import Overlay from "../overlay/Overlay.tsx";
import FilterComponents from "./filter components/FilterComponents.js";
import FilterHeader from "./filter header/FilterHeader.js";
const Filter = (props) => {


  return (
    <div>
      <Overlay
        header={<FilterHeader title={"Filter"} />}
        open={props.showFilter}
        onClose={() => props.setShowFilter(false)}
        position="right"
      >
        <FilterComponents />

      </Overlay>
    </div>
  );
};

export default Filter;

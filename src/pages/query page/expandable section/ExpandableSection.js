import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import icons from "../../../assets/data/priceDetailsIcons";
import classes from "./expandableSection.module.css";

function ExpandableSection(props) {
  return (
    <details className={classes.wrapper}>
      <summary className={classes.sectionTitle}>
        <div className={classes.sectionName}>{props.title}</div>
        <ExpandMoreIcon
          className={classes.expandIcon}
          sx={{ fontSize: "4rem" }}
        />
      </summary>
      <ul className={classes.content}>
        {/* <li>{props.text}</li> */}
        {props.children}
      </ul>
    </details>
  );
}

export default ExpandableSection;

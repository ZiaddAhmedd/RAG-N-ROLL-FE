import classes from "./table.module.css";
import EditIcon from "@mui/icons-material/Edit";

function Table(props) {
  const renderRow = (row) => {
    const available = !row.outOfStock;
    return (
      <tr className={classes.row}>
        <td>
          <div className={classes.productImg}>
            <img src={row.featuredImage} alt={row.name} />
          </div>
        </td>
        <td>
          <span>{row.name}</span>
          {/* <p>{row.description}</p> */}
        </td>
        <td>
          <ul className={classes.tags}>
            {row.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </td>
        <td className={classes.category}>{row.category}</td>
        <td>
          <ul>
            {[...new Set(row.variants.map((variant) => variant.color))].map(
              (color) => (
                <li key={color}>{color}</li>
              )
            )}
          </ul>
        </td>

        <td>
          <span
            className={`${classes.status} 
          ${available ? classes.available : classes.notAvailable}`}
          >
            <span className={classes.dot}></span>
            {available ? "in stock" : "out of stock"}
          </span>
        </td>

        <td>{row.variants[0].price} EGP</td>
        <td>
          <button className={classes.btn}>
            <EditIcon /> Edit
          </button>
        </td>
      </tr>
    );
  };

  return (
    <table className={classes.table}>
      <thead className={classes.header}>
        <tr>
          {props.columns.map((column, index) => (
            <th key={index} className={classes.head}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody classname={classes.body}>
        {props.rows.map((row, index) => renderRow(row))}
      </tbody>
    </table>
  );
}

export default Table;

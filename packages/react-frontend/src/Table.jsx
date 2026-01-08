// src/Table.jsx
function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  );
}
function TableBody(props) {
  const rows = props.characterData.map((row, index) => { // arrow func to create a row for each character
    return (
        <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
            <button onClick={() => props.removeCharacter(index)}>
            Delete
            </button>
        </td>
        </tr>
    );
   }
  );
  return (
      <tbody>
        {rows}
       </tbody>
   );
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}
export default Table; // need this to add elements into MyApp.jsx
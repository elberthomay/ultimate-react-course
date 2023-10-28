export default function Stats({ packList }) {
  if (packList.length === 0) {
    return (
      <footer className="stats">
        <p>Start adding some items to your packing list 🚀</p>
      </footer>
    );
  }

  const packedCount = packList.filter((item) => item.checked).length;
  const percentPacked = Math.floor((packedCount / packList.length) * 100);
  return (
    <footer className="stats">
      {percentPacked === 100
        ? "You've got everything ready to go ✈️"
        : `💼You have ${packList.length} item${
            packList.length > 1 ? "s" : ""
          } on your list, and you already packed ${packedCount}(${
            isNaN(percentPacked) ? "X" : percentPacked
          }%)`}
    </footer>
  );
}

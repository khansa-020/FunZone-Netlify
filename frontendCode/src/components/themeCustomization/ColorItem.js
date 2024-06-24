const ColorItem=({color, setColor})=><div  onClick={setColor} className="color-item" style={{'--color-primary':color}}></div>
export default ColorItem;
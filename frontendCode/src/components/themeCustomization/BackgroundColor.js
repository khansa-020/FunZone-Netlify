const BackgroundColor=({bgcolor, bgsetColor, fontClr})=><div  onClick={bgsetColor} className="bg-clr" style={{'--color-white':bgcolor,'--color-dark':fontClr}}></div>
export default BackgroundColor;
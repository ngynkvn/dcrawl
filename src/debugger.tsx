import React from "react"

export default function Debugger({game}: any) {
    return (<div>
        Hi!
        <button onClick={() => console.log(game)}>Click</button>
    </div>)
}
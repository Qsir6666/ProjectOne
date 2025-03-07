import React, { useState } from "react";
import Head from '../../../pages/Head'

const App: React.FC = () => {
    const [title,setTitle] = useState('检查')
    return (
        <div>
            <Head ></Head>
        </div>
    )
}
export default App;
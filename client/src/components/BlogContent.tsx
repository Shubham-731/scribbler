import style from "@/styles/BlogContent.module.css"
import { useEffect } from "react"
import hljs from "highlight.js"

const BlogContent = () => {
    useEffect(() => {
        hljs.highlightAll()
    })

    return (
        <div className={style.Blog_content}>
            <p>
                <img
                    style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                    title="Tiny Logo"
                    src="https://doimages.nyc3.digitaloceanspaces.com/download.png"
                    alt="TinyMCE Logo"
                    width="128"
                    height="128"
                />
            </p>
            <h2 style={{ textAlign: "center" }}>
                Welcome to the TinyMCE Cloud demo!
            </h2>
            <p>
                Please try out the features provided in this full featured
                example (excluding{" "}
                <a href="../../../../tinymce/features/">Premium Plugins</a>
                ).
            </p>
            <h2>Got questions or need help?</h2>
            <ul>
                <li>
                    Our{" "}
                    <a className="mceNonEditable" href="../">
                        documentation
                    </a>{" "}
                    is a great resource for learning how to configure TinyMCE.
                </li>
                <li>
                    Have a specific question? <code>code</code> Try the{" "}
                    <a
                        href="https://stackoverflow.com/questions/tagged/tinymce"
                        target="_blank"
                        rel="noopener"
                    >
                        <code>tinymce</code> tag at Stack Overflow
                    </a>
                    .
                </li>
                <li>
                    We also offer enterprise grade support as part of{" "}
                    <a href="../../../../pricing">TinyMCE premium plans</a>.
                </li>
            </ul>
            <h2>A simple table to play with</h2>
            <table
                style={{ borderCollapse: "collapse", width: "100%" }}
                border={1}
            >
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Cost</th>
                        <th>Really?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>TinyMCE Cloud</td>
                        <td>Get started for free</td>
                        <td>YES!</td>
                    </tr>
                    <tr>
                        <td>Plupload</td>
                        <td>Free</td>
                        <td>YES!</td>
                    </tr>
                </tbody>
            </table>
            <h2>Found a bug?</h2>
            <p>
                If you think you have found a bug please create an issue on the{" "}
                <a href="https://github.com/tinymce/tinymce/issues">
                    GitHub repo
                </a>{" "}
                to report it to the developers.
            </p>
            <h2>Finally ...</h2>
            <p>
                Don't forget to check out our other product{" "}
                <a
                    href="http://www.plupload.com"
                    target="_blank"
                    rel="noopener"
                >
                    Plupload
                </a>
                , your ultimate upload solution featuring HTML5 upload support.
            </p>
            <p>
                Thanks for supporting TinyMCE! We hope it helps you and your
                users create great content.
                <br />
                All the best from the TinyMCE team.
            </p>
            <pre className="language-html">
                <code>&lt;p&gt;Sample code&lt;/p&gt;</code>
            </pre>
            <pre className="language-typescript">
                <code>
                    function name(params:type){" "}
                    {`{
        console.log("Hello world")
}`}
                </code>
            </pre>
        </div>
    )
}

export default BlogContent

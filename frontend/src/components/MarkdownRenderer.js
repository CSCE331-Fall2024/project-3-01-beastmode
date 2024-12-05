import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const MarkdownRenderer = (props) => {
    const [content, setContent] = useState("");

    useEffect(() => {
        // Fetch the Markdown file from the provided file path
        fetch(props.filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not fetch file: " + response.statusText);
                }
                return response.text();
            })
            .then((text) => setContent(text))
            .catch((error) => console.error(error));
    }, [props.filePath]);

    // Render the ReactMarkdown component with the fetched content
    return React.createElement(
        "div",
        { className: "markdown-container" },
        React.createElement(ReactMarkdown, null, content)
    );
};

export default MarkdownRenderer;

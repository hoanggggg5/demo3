import React from "react";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import * as Essentials from "@ckeditor/ckeditor5-essentials";
// import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";

import CKEditor from "@ckeditor/ckeditor5-react";
console.log(ClassicEditor.builtinPlugins.map((plugin) => plugin.pluginName));
export default class Contact extends React.Component {
    state = {
        username: "",
        email: "",
        phone: "",
        content: "",
    };

    handleStateChanges = (event) => {
        const target = event.target;

        const { name, value } = target;

        this.setState({
            [name]: value,
        });
    };

    render() {
        // console.log("STATE _", this.state);
        return (
            <div className="container">
                <div className="wrapper">
                    <h1>Contact Form</h1>

                    <form>
                        <div className="form-group">
                            <div className="form-group">
                                <label>Texr Content</label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    onReady={(editor) => {
                                        //// Here the editor is ready to be used
                                    }}
                                    onChange={(event, editor) => {
                                        console.log(editor);
                                        editor.model.document.on(
                                            "click",
                                            (evt, data) => {
                                                console.log(evt, data);
                                            }
                                        );

                                        // console.log(event);
                                        const data = editor.getData();
                                        this.setState({ content: data });
                                        // console.log("STATE", { data });
                                    }}
                                    config={{
                                        ckfinder: {
                                            // The URL that the images are uploaded to.
                                            uploadUrl: "/upload",

                                            // Enable the XMLHttpRequest.withCredentials property.
                                            withCredentials: true,

                                            // Headers sent along with the XMLHttpRequest to the upload server.
                                            headers: {
                                                "X-CSRF-TOKEN": "CSFR-Token",
                                                Authorization:
                                                    "Bearer <JSON Web Token>",
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btn btn-primary"
                                name="submit"
                                value="Submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

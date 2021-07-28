import React from "react";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import * as Essentials from "@ckeditor/ckeditor5-essentials";
// import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";

import CKEditor from "@ckeditor/ckeditor5-react";
export default class Contact extends React.Component {
    state = {};

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
                                        let data = editor.getData();
                                        console.log(this.state, data);
                                        // console.log("STATE", { data });
                                        editor.model.document.on(
                                            "change:data",
                                            () => {
                                                let dataMatch =
                                                    data.match(/\<.*?\>/g);
                                                let state = this.state.data;
                                                console.log(state);
                                                let stateMatch = state
                                                    ? state.match(/\<.*?\>/g)
                                                    : "";
                                                if (stateMatch.length > 0) {
                                                    let checkFilter =
                                                        dataMatch.filter(
                                                            (x) =>
                                                                !stateMatch.includes(
                                                                    x
                                                                )
                                                        );
                                                    var regex =
                                                        /<img.*?src=\"(.*?)\"/;
                                                    const newCheck = regex.exec(
                                                        checkFilter[0]
                                                    );
                                                    console.log(newCheck);
                                                    if (newCheck) {
                                                        const imgSrcDelete =
                                                            newCheck[1];
                                                        return localStorage.setItem('deletedImg',JSON.stringify( imgSrcDelete));
                                                    }
                                                }
                                            }
                                        );
                                        this.setState({ data });
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

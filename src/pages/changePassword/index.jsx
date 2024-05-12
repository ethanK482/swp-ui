import { Button, Form, Input, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import {  useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import api from "../../api/http";
import ChangePasswordStyle from "./ChangePassword.style";
const clientGoogleId =
    "633795216418-nirmtba2ogtmj84i1om6mc7f8lhlkr4p.apps.googleusercontent.com";
const ChangePassword = () => {
    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.client.init({
                clientId: clientGoogleId,
            });
        });
    });

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
    };

    const changePasswordMutation = useMutation({
        mutationFn: (formData) => {
            return api.post("change-password", formData);
        },
    });

    const navigate = useNavigate();
    const onfinish = (body) => {
        console.log(body)
    }


    return (
        <ChangePasswordStyle>
            <div className="signup">
                <div className="image">hello</div>
                <div className="signup_content ">
                    <span className="signup_content_title" >Reset Password</span>


                    <Form
                        onFinish={onfinish}
                        layout="vertical"
                        {...formItemLayout}
                        name="register"

                        scrollToFirstError
                    >

                        <Form.Item
                            name="newPassword"
                            label="Enter your new password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your new password",
                                },
                                {
                                    pattern: new RegExp(
                                        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:"\\|,.<>\\/?]).{8,}$'
                                    ),
                                    message:
                                        "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.",
                                },
                            ]}
                        >
                            <Input placeholder="Enter your new password" />
                        </Form.Item>
                        <Form.Item
                            name=" confirmpassword"
                            label="ConfirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your password!",
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Confirm your password" />
                        </Form.Item>


                        <Form.Item >
                            {/* {changePasswordMutation.isPending ? (
                                <Button loading style={{ textAlign: "center" }}>
                                    Reset
                                </Button>
                            ) : (
                                <Button
                                    size="large"
                                    htmlType="submit"
                                    style={{ textAlign: "center" }}
                                >
                                    Reset
                                </Button>
                            )} */}
                              <Button
                                    size="large"
                                    htmlType="submit"
                                    style={{ textAlign: "center" }}
                                >
                                    Reset
                                </Button>
                        </Form.Item>

                    </Form>

                </div>
            </div>
        </ChangePasswordStyle>

    );
};
export default ChangePassword;

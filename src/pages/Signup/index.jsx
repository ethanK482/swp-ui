import { Button, Checkbox, Form, Input, notification } from "antd";
import SignupStyle from "./Signup.style";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/http";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import useProtectRoute from "../../hook/user/useProtectRoute";
const clientGoogleId =
  "633795216418-nirmtba2ogtmj84i1om6mc7f8lhlkr4p.apps.googleusercontent.com";
const SignUpScreen = () => {
  useProtectRoute()
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

  const registerMutation = useMutation({
    mutationFn: (formData) => {
      return api.post("signup", formData);
    },
  });
  const socialLoginMutation = useMutation({
    mutationFn: (formData) => {
      return api.post("social", formData);
    },
  });
  const navigate = useNavigate();
  const onfinish = (body) => {
    registerMutation.mutate(body, {
      onSuccess(data) {
        navigate(`/verify?email=${data.data.email}`);
        notification.success({ message: "Register successfully" });
      },
      onError(data) {
        notification.error({ message: data.response.data.message });
      },
    });
  };
  const responseGoogle = (response) => {
    const {
      name,
      googleId: sid,
      imageUrl: picture,
      email,
    } = response.profileObj;
    socialLoginMutation.mutate(
      { name, sid, picture, email },
      {
        onError() {
          notification.success({ message: "Can't login with google" });
        },
      }
    );
  };

  return (
    <SignupStyle>
      <div className="signup">
        <div className="image ">hello</div>
        <div className="signup_content ">
          <span className="signup_content_title">Sign Up</span>
          <div className="social mt-3">
            <GoogleLogin
              className="social_button"
              buttonText="Continue with Google"
              clientId={clientGoogleId}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </div>
          <span>Or Email</span>
          <Form
            onFinish={onfinish}
            layout="vertical"
            {...formItemLayout}
            name="register"
            scrollToFirstError
          >
            <Form.Item
              name="fullName"
              label="Full name"
              rules={[
                {
                  required: true,
                  message: "Please input full name!",
                },
              ]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  pattern: new RegExp(
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:"\\|,.<>\\/?]).{8,}$'
                  ),
                  message:
                    "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm your email" />
            </Form.Item>
            <Form.Item
              className="left"
              name="agree"
              valuePropName="checked" // Ensure that the Form.Item knows how to extract the value from the Checkbox
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Please read and agree with our policy")
                        ),
                },
              ]}
            >
              <Checkbox>I have read and accept all policy</Checkbox>
            </Form.Item>

            <Form.Item>
              {registerMutation.isPending ? (
                <Button loading style={{ textAlign: "center" }}>
                  Sign up
                </Button>
              ) : (
                <Button
                  size="large"
                  htmlType="submit"
                  style={{ textAlign: "center" }}
                >
                  Sign up
                </Button>
              )}
            </Form.Item>
            <Form.Item>
              <span>You already have an account? </span>{" "}
              <Link style={{ color: "blue" }} to={"/login"}>
                Sign in
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </SignupStyle>
  );
};
export default SignUpScreen;

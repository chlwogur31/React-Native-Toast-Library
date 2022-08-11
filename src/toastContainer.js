import React, { Component, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import Toast from "./Toast";
const { width, height } = Dimensions.get("window");
class ToastContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toasts: [],
    };
    this.show = (message, toastOptions) => {
      let id =
        (toastOptions === null || toastOptions === void 0
          ? void 0
          : toastOptions.id) || Math.random().toString();
      const onDestroy = () => {
        (toastOptions === null || toastOptions === void 0
          ? void 0
          : toastOptions.onClose) &&
          (toastOptions === null || toastOptions === void 0
            ? void 0
            : toastOptions.onClose());
        this.setState({ toasts: this.state.toasts.filter((t) => t.id !== id) });
      };
      requestAnimationFrame(() => {
        this.setState({
          toasts: [
            {
              id,
              onDestroy,
              message,
              open: true,
              onHide: () => this.hide(id),
              ...this.props,
              ...toastOptions,
            },
            ...this.state.toasts.filter((t) => t.open),
          ],
        });
      });
      return id;
    };
  }

  renderBottomToasts() {
    const { toasts } = this.state;
    let { offset, offsetBottom } = this.props;
    let style = {
      bottom: offsetBottom || offset,
      width: width,
      justifyContent: "flex-end",
      flexDirection: "column",
    };
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : undefined}
        style={{ ...styles.container, ...style }}
        pointerEvents="box-none"
      >
        {toasts
          .filter((t) => t.placement === "bottom")
          .reverse()
          .map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
      </KeyboardAvoidingView>
    );
  }
  renderTopToasts() {
    const { toasts } = this.state;
    const { offset, offsetTop } = this.props;
    let style = {
      top: offsetTop || offset,
      width: width,
      justifyContent: "flex-start",
      flexDirection: "column-reverse",
    };
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : undefined}
        style={[styles.container, style]}
        pointerEvents="box-none"
      >
        {toasts
          .filter((t) => t.placement === "top")
          .reverse()
          .map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
      </KeyboardAvoidingView>
    );
  }
  renderCenterToasts() {
    const { toasts } = this.state;
    let { offset, offsetTop } = this.props;
    let style = {
      top: height * -0.05,
      height: height,
      width: width,
      justifyContent: "center",
      flexDirection: "column-reverse",
    };

    const data = toasts.filter((t) => t.placement === "center");
    const foundToast = data.length > 0;

    if (!foundToast) return null;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : undefined}
        style={[styles.container, style]}
        pointerEvents="box-none"
      >
        {toasts
          .filter((t) => t.placement === "center")
          .reverse()
          .map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
      </KeyboardAvoidingView>
    );
  }
  render() {
    return (
      <>
        {this.renderTopToasts()}
        {this.renderCenterToasts()}
        {this.renderBottomToasts()}
      </>
    );
  }
}
ToastContainer.defaultProps = {
  placement: "bottom",
  offset: 70,
  backgroundColor: "#333",
};
const styles = StyleSheet.create({
  container: {
    flex: 0,
    position: "absolute",
    maxWidth: "100%",
    zIndex: 999999,
    elevation: 999999,
    alignSelf: "center",
    ...(Platform.OS === "web" ? { overflow: "hidden" } : null),
  },
});

export default ToastContainer;

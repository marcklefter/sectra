import React from 'react';

export class ErrorBoundary extends React.Component {
  state = {
    error: null
  };

  static getDerivedStateFromError(error) {
    return {
      error
    };
  }

  retry = () => {
    this.setState({
      error: null
    });
  }

  render() {
    const {
      error
    } = this.state;

    return this.props.children(error, this.retry);
  }
}
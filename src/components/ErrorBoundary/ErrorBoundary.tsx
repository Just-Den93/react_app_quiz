// components/ErrorBoundary/ErrorBoundary.tsx
interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
 }
 
 class ErrorBoundary extends React.Component<{ children: ReactNode }, ErrorBoundaryState> {
	state = { hasError: false, error: null };
 
	static getDerivedStateFromError(error: Error) {
	  return { hasError: true, error };
	}
 
	render() {
	  if (this.state.hasError) {
		 return (
			<div className="error-container">
			  <h2>Щось пішло не так</h2>
			  <p>{this.state.error?.message}</p>
			  <button onClick={() => window.location.reload()}>
				 Спробувати знову
			  </button>
			</div>
		 );
	  }
 
	  return this.props.children;
	}
 }
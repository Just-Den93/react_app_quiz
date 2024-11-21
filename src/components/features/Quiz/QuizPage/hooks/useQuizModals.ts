export const useQuizModals = () => {
	const [isSettingsVisible, setIsSettingsVisible] = useState(false);
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [showEndMessage, setShowEndMessage] = useState(false);
	const [confettiRunning, setConfettiRunning] = useState(false);
 
	const modalHandlers = useMemo(() => ({
	  openSettings: () => setIsSettingsVisible(true),
	  closeSettings: () => setIsSettingsVisible(false),
	  openMenu: () => setIsMenuVisible(true),
	  closeMenu: () => setIsMenuVisible(false),
	  showGameEnd: () => {
		 setShowEndMessage(true);
		 setConfettiRunning(true);
	  },
	  hideGameEnd: () => {
		 setShowEndMessage(false);
		 setConfettiRunning(false);
	  }
	}), []);
 
	return {
	  isSettingsVisible,
	  isMenuVisible,
	  showEndMessage,
	  confettiRunning,
	  modalHandlers
	};
 };
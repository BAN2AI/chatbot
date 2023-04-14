var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) {if (window.CP.shouldStopExecution(1)){break;} var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); }
window.CP.exitedLoop(1);
 } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {if (window.CP.shouldStopExecution(2)){break;} arr2[i] = arr[i]; }
window.CP.exitedLoop(2);
 return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* detect url in a message and add a link tag */
function detectURL(message) {
	var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
	return message.replace(urlRegex, function (urlMatch) {
		return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
	});
}

/* ========== */
/* Title component */

var Title = function (_React$Component) {
	_inherits(Title, _React$Component);

	function Title(props, context) {
		_classCallCheck(this, Title);

		return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).call(this, props, context));
	}

	_createClass(Title, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: "chatApp__convTitle" },
				this.props.owner,
				' screen'
			);
		}
	}]);

	return Title;
}(React.Component);
/* end Title component */
/* ========== */

/* ========== */
/* InputMessage component - used to type the message */


var InputMessage = function (_React$Component2) {
	_inherits(InputMessage, _React$Component2);

	function InputMessage(props, context) {
		_classCallCheck(this, InputMessage);

		var _this2 = _possibleConstructorReturn(this, (InputMessage.__proto__ || Object.getPrototypeOf(InputMessage)).call(this, props, context));

		_this2.handleSendMessage = _this2.handleSendMessage.bind(_this2);
		_this2.handleTyping = _this2.handleTyping.bind(_this2);
		return _this2;
	}

	_createClass(InputMessage, [{
		key: 'handleSendMessage',
		value: function handleSendMessage(event) {
			event.preventDefault();
			/* Disable sendMessage if the message is empty */
			if (this.messageInput.value.length > 0) {
				this.props.sendMessageLoading(this.ownerInput.value, this.ownerAvatarInput.value, this.messageInput.value);
				/* Reset input after send*/
				this.messageInput.value = '';
			}
		}
	}, {
		key: 'handleTyping',
		value: function handleTyping(event) {
			/* Tell users when another user has at least started to write */
			if (this.messageInput.value.length > 0) {
				this.props.typing(this.ownerInput.value);
			} else {
				/* When there is no more character, the user no longer writes */
				this.props.resetTyping(this.ownerInput.value);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			/* If the chatbox state is loading, loading class for display */
			var loadingClass = this.props.isLoading ? 'chatApp__convButton--loading' : '';
			var sendButtonIcon = React.createElement(
				'i',
				{ className: "material-icons" },
				'send'
			);
			return React.createElement(
				'form',
				{ onSubmit: this.handleSendMessage },
				React.createElement('input', {
					type: 'hidden',
					ref: function ref(owner) {
						return _this3.ownerInput = owner;
					},
					value: this.props.owner
				}),
				React.createElement('input', {
					type: 'hidden',
					ref: function ref(ownerAvatar) {
						return _this3.ownerAvatarInput = ownerAvatar;
					},
					value: this.props.ownerAvatar
				}),
				React.createElement('input', {
					type: 'text',
					ref: function ref(message) {
						return _this3.messageInput = message;
					},
					className: "chatApp__convInput",
					placeholder: 'Text message',
					onKeyDown: this.handleTyping,
					onKeyUp: this.handleTyping,
					tabIndex: '0'
				}),
				React.createElement(
					'div',
					{ className: 'chatApp__convButton ' + loadingClass, onClick: this.handleSendMessage },
					sendButtonIcon
				)
			);
		}
	}]);

	return InputMessage;
}(React.Component);
/* end InputMessage component */
/* ========== */

/* ========== */
/* TypingIndicator component */


var TypingIndicator = function (_React$Component3) {
	_inherits(TypingIndicator, _React$Component3);

	function TypingIndicator(props, context) {
		_classCallCheck(this, TypingIndicator);

		return _possibleConstructorReturn(this, (TypingIndicator.__proto__ || Object.getPrototypeOf(TypingIndicator)).call(this, props, context));
	}

	_createClass(TypingIndicator, [{
		key: 'render',
		value: function render() {
			var typersDisplay = '';
			var countTypers = 0;
			/* for each user writing messages in chatroom */
			for (var key in this.props.isTyping) {if (window.CP.shouldStopExecution(3)){break;}
				/* retrieve the name if it isn't the owner of the chatbox */
				if (key != this.props.owner && this.props.isTyping[key]) {
					typersDisplay += ', ' + key;
					countTypers++;
				}
			}
window.CP.exitedLoop(3);

			/* formatting text */
			typersDisplay = typersDisplay.substr(1);
			typersDisplay += countTypers > 1 ? ' are ' : ' is ';
			/* if at least one other person writes */
			if (countTypers > 0) {
				return React.createElement(
					'div',
					{ className: "chatApp__convTyping" },
					typersDisplay,
					' writing',
					React.createElement('span', { className: "chatApp__convTypingDot" })
				);
			}
			return React.createElement('div', { className: "chatApp__convTyping" });
		}
	}]);

	return TypingIndicator;
}(React.Component);
/* end TypingIndicator component */
/* ========== */

/* ========== */
/* MessageList component - contains all messages */


var MessageList = function (_React$Component4) {
	_inherits(MessageList, _React$Component4);

	function MessageList(props, context) {
		_classCallCheck(this, MessageList);

		return _possibleConstructorReturn(this, (MessageList.__proto__ || Object.getPrototypeOf(MessageList)).call(this, props, context));
	}

	_createClass(MessageList, [{
		key: 'render',
		value: function render() {
			var _this6 = this;

			return React.createElement(
				'div',
				{ className: "chatApp__convTimeline" },
				this.props.messages.slice(0).reverse().map(function (messageItem) {
					return React.createElement(MessageItem, {
						key: messageItem.id,
						owner: _this6.props.owner,
						sender: messageItem.sender,
						senderAvatar: messageItem.senderAvatar,
						message: messageItem.message
					});
				})
			);
		}
	}]);

	return MessageList;
}(React.Component);
/* end MessageList component */
/* ========== */

/* ========== */
/* MessageItem component - composed of a message and the sender's avatar */


var MessageItem = function (_React$Component5) {
	_inherits(MessageItem, _React$Component5);

	function MessageItem() {
		_classCallCheck(this, MessageItem);

		return _possibleConstructorReturn(this, (MessageItem.__proto__ || Object.getPrototypeOf(MessageItem)).apply(this, arguments));
	}

	_createClass(MessageItem, [{
		key: 'render',
		value: function render() {
			/* message position formatting - right if I'm the author */
			var messagePosition = this.props.owner == this.props.sender ? 'chatApp__convMessageItem--right' : 'chatApp__convMessageItem--left';
			return React.createElement(
				'div',
				{ className: "chatApp__convMessageItem " + messagePosition + " clearfix" },
				React.createElement('img', { src: this.props.senderAvatar, alt: this.props.sender, className: 'chatApp__convMessageAvatar' }),
				React.createElement('div', { className: 'chatApp__convMessageValue', dangerouslySetInnerHTML: { __html: this.props.message } })
			);
		}
	}]);

	return MessageItem;
}(React.Component);
/* end MessageItem component */
/* ========== */

/* ========== */
/* ChatBox component - composed of Title, MessageList, TypingIndicator, InputMessage */


var ChatBox = function (_React$Component6) {
	_inherits(ChatBox, _React$Component6);

	function ChatBox(props, context) {
		_classCallCheck(this, ChatBox);

		var _this8 = _possibleConstructorReturn(this, (ChatBox.__proto__ || Object.getPrototypeOf(ChatBox)).call(this, props, context));

		_this8.state = {
			isLoading: false
		};
		_this8.sendMessageLoading = _this8.sendMessageLoading.bind(_this8);
		var timeout = null;
		return _this8;
	}
	/* catch the sendMessage signal and update the loading state then continues the sending instruction */


	_createClass(ChatBox, [{
		key: 'sendMessageLoading',
		value: function sendMessageLoading(sender, senderAvatar, message) {
			var _this9 = this;

			this.setState({ isLoading: true });
			this.props.sendMessage(sender, senderAvatar, message);
			setTimeout(function () {
				_this9.setState({ isLoading: false });
			}, 400);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: "chatApp__conv" },
				React.createElement(Title, {
					owner: this.props.owner
				}),
				React.createElement(MessageList, {
					owner: this.props.owner,
					messages: this.props.messages
				}),
				React.createElement(
					'div',
					{ className: "chatApp__convSendMessage clearfix" },
					React.createElement(TypingIndicator, {
						owner: this.props.owner,
						isTyping: this.props.isTyping
					}),
					React.createElement(InputMessage, {
						isLoading: this.state.isLoading,
						owner: this.props.owner,
						ownerAvatar: this.props.ownerAvatar,
						sendMessage: this.props.sendMessage,
						sendMessageLoading: this.sendMessageLoading,
						typing: this.props.typing,
						resetTyping: this.props.resetTyping
					})
				)
			);
		}
	}]);

	return ChatBox;
}(React.Component);
/* end ChatBox component */
/* ========== */

/* ========== */
/* ChatRoom component - composed of multiple ChatBoxes */


var ChatRoom = function (_React$Component7) {
	_inherits(ChatRoom, _React$Component7);

	function ChatRoom(props, context) {
		_classCallCheck(this, ChatRoom);

		var _this10 = _possibleConstructorReturn(this, (ChatRoom.__proto__ || Object.getPrototypeOf(ChatRoom)).call(this, props, context));

		_this10.state = {
			messages: [],
			isTyping: []
		};
		_this10.sendMessage = _this10.sendMessage.bind(_this10);
		_this10.typing = _this10.typing.bind(_this10);
		_this10.resetTyping = _this10.resetTyping.bind(_this10);
		return _this10;
	}
	/* adds a new message to the chatroom */


	_createClass(ChatRoom, [{
		key: 'sendMessage',
		value: function sendMessage(sender, senderAvatar, message) {
			var _this11 = this;

			setTimeout(function () {
				var messageFormat = detectURL(message);
				var newMessageItem = {
					id: _this11.state.messages.length + 1,
					sender: sender,
					senderAvatar: senderAvatar,
					message: messageFormat
				};
				_this11.setState({ messages: [].concat(_toConsumableArray(_this11.state.messages), [newMessageItem]) });
				_this11.resetTyping(sender);
			}, 400);
		}
		/* updates the writing indicator if not already displayed */

	}, {
		key: 'typing',
		value: function typing(writer) {
			if (!this.state.isTyping[writer]) {
				var stateTyping = this.state.isTyping;
				stateTyping[writer] = true;
				this.setState({ isTyping: stateTyping });
			}
		}
		/* hide the writing indicator */

	}, {
		key: 'resetTyping',
		value: function resetTyping(writer) {
			var stateTyping = this.state.isTyping;
			stateTyping[writer] = false;
			this.setState({ isTyping: stateTyping });
		}
	}, {
		key: 'render',
		value: function render() {
			var users = {};
			var chatBoxes = [];
			var messages = this.state.messages;
			var isTyping = this.state.isTyping;
			var sendMessage = this.sendMessage;
			var typing = this.typing;
			var resetTyping = this.resetTyping;

			/* user details - can add as many users as desired */
			users[0] = { name: 'Shun', avatar: 'https://i.imgur.com/6rlfZY0.png' };
			users[1] = { name: 'Gaga', avatar: '../images/57fad5a029e56_thumb900.jpg' };
			/* test with two other users :)
   users[2] = { name: 'Kate', avatar: 'https://i.imgur.com/kyV8WUW.png' };
   users[3] = { name: 'Patrick', avatar: 'https://i.imgur.com/lc296J8.png' };
   */

			/* creation of a chatbox for each user present in the chatroom */
			Object.keys(users).map(function (key) {
				var user = users[key];
				chatBoxes.push(React.createElement(ChatBox, {
					key: key,
					owner: user.name,
					ownerAvatar: user.avatar,
					sendMessage: sendMessage,
					typing: typing,
					resetTyping: resetTyping,
					messages: messages,
					isTyping: isTyping
				}));
			});
			return React.createElement(
				'div',
				{ className: "chatApp__room" },
				chatBoxes
			);
		}
	}]);

	return ChatRoom;
}(React.Component);
/* end ChatRoom component */
/* ========== */

/* render the chatroom */


setTimeout(function () {
	ReactDOM.render(React.createElement(ChatRoom, null), document.getElementById("chatApp"));
}, 400);
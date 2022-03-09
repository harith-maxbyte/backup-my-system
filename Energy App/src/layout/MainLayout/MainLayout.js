import React, { Component, Fragment } from 'react';
import withStyles from '@mui/styles/withStyles';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Drawer } from '@mui/material';
import { Topbar } from './components';
import Newsidebar from "./components/Newsidebar/Newsidebar";
import styles from './styles';
import useMediaQuery from '@mui/material/useMediaQuery'

export const withMediaQuery = (queries = []) => Component => props => {
	const mediaProps = {}
	queries.forEach(q => {
		mediaProps[q[0]] = useMediaQuery(q[1])
	})
	return <Component {...mediaProps} {...props} />
}

class MainLayout extends Component {
	constructor(props) {
		super(props);
		// this.wrapper = React.createRef()
		this.state = {
			isOpen: true
		};
	}

	static defaultProps = {
		isSidebarOpen: true
	};

	static propTypes = {
		children: PropTypes.node,
		isSidebarOpen: PropTypes.bool,
		title: PropTypes.string
	};

	handleToggleOpen = () => {
		this.setState(state => ({
			isOpen: !state.isOpen,
		}));
	};

	handleClose = () => {
		this.setState({ isOpen: false });
	};

	render() {
		const { isOpen } = this.state;
		const { title, children, classes, isDesktop } = this.props;
		const shouldOpenSidebar = isOpen;

		return (
			<Fragment>
				<Topbar
					title={title}
					// classes={{ paper: classes.drawerPaper }}
					// ToolbarClasses={classes.topbar}
					isSidebarOpen={shouldOpenSidebar}
					onToggleSidebar={() => this.handleToggleOpen()}
					variant={isDesktop ? "persistent" : 'temporary'}
				// ref={this.wrapper}
				/>

				<Drawer
					anchor="left"
					classes={{ paper: classes.drawerPaper }}
					open={shouldOpenSidebar}
					onClose={() => this.handleClose()}
					variant={isDesktop ? "persistent" : 'temporary'}
				// ref={this.wrapper}
				>
					<Newsidebar />
				</Drawer>

				<main
					// ref={this.wrapper}
					className={
						classnames({
							[classes.contentShift]: isDesktop ? isOpen : false,
							[classes.content]: true
						})
					}
				>
					{children}
				</main>
			</Fragment>
		);
	}
}


export default React.memo(withStyles(styles)((withMediaQuery([
	['isDesktop', theme => theme.breakpoints.up('lg'), {
		defaultMatches: true
	}],
	// ['isDesktop', theme => theme.breakpoints.up('md'), {
	// 	defaultMatches: true
	// }]
])(MainLayout))));

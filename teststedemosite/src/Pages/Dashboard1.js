import React, { lazy, Suspense, PureComponent } from 'react';
import { styled, Grid, Card, Divider, IconButton, Tooltip, tooltipClasses } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import Chart from 'react-apexcharts'
import { Link } from "react-router-dom";
import moment from 'moment';
import Dashstyles1 from './Dashboardstyles1'
import { connect } from 'react-redux';
import {
	EnergyMonthly, ShiftMonthly, ShiftDaily, ShiftWeekly, ShiftYear,
	// ShiftCustom
} from "../store/actions/index";
// import { TweenMax } from 'gsap';
// import { gsap } from 'gsap/all';



const Modal = lazy(() => import('./Modal'));
const Device = lazy(() => import('./Device'));
const EnergyTable = lazy(() => import('./DataGrid'));
const ShiftTable = lazy(() => import('./DataGrid1'));

const LightTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.common.white,
		color: "rgba(0, 0, 0, 0.87)",
		boxShadow: theme.shadows[1],
		fontSize: 12
	}
}));

/**
 * @class
 * Class representing Dashboard component
 */

// let useBtn = []
let month = []
let todayconsume = 0.0;
class Dashboard1 extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			useData: [],
			day: [],
			energymonthdata: [],
		};
		// reference to the DOM node
		// this.myElement = null;
		// reference to the animation
		// this.myTween = null;
	}
	componentDidMount() {
		// this.props.dispatch(EnergyDaily())
		this.props.dispatch(EnergyMonthly())

		this.props.dispatch(ShiftDaily())
		this.props.dispatch(ShiftWeekly())
		this.props.dispatch(ShiftMonthly())
		this.props.dispatch(ShiftYear())

		// gsap.from(this.myElement, {
		// 	duration: 1,
		// 	autoAlpha: 0,
		// 	ease: 'none',
		// 	delay: .2
		// })
		// gsap.from()
	}


	/**
	* @function
	* all required functions.
	*/
	timeConverter = (t) => {
		return moment.utc(t).format('MM/DD/YY');
	}

	energyConsumptionChart = (selectedButton, customButton, energyDailyChart, shiftDailyData, energyWeeklyChart, energyMonthlyChart, energyCustomChart, energyYearlyData, shiftYearlyData) => {

		let data = []
		let time = []
		let seriesData = []
		var series = []

		if (selectedButton === "Day") {
			data = shiftDailyData
			var edate = data.filter(function (obj) {
				if ('edate' in obj) {
					return true;
				} else {
					return false;
				}
			}).map(function (obj) { return obj['edate']; });

			time.push(this.timeConverter(edate[0]))
			seriesData.push((todayconsume).toFixed(2))
			series = [
				{ name: "Energy Consumption", data: seriesData }
			]
			var options = {

				xaxis: {
					type: 'date',
					categories: time,
					tickPlacement: 8,
					labels: {
						show: true,
						formatter: function (val) {
							return moment(new Date(val)).format('Do MMM YYYY'); // formats to hours:minutes
						}
					}
				},
				stroke: {
					width: 2,
					curve: 'smooth',
				},
				dataLabels: {
					enabled: false,
					dropShadow: {
						enabled: true
					}
				},
				title: {
					text: "Energy Consumption (kWH)",
					align: 'left',
					offsetX: 7,
					offsetY: 7,
					style: {
						fontSize: '17px',
						fontWeight: "bold",
						color: "rgb(33, 33, 33)",
						fontFamily: "Roboto, sans-serif",
					},
				},
				tooltip: {
					theme: 'dark',
				},
				fill: {
					opacity: [0.85, 0.25, 1],
					gradient: {
						inverseColors: false,
						shade: 'light',
						type: "vertical",
						opacityFrom: 0.85,
						opacityTo: 0.55,
						stops: [0, 100, 100, 100]
					}
				},
				legend: {
					position: 'bottom',
					showForSingleSeries: true,
					fontWeight: "bold",
					onItemClick: {
						toggleDataSeries: true
					}
				},
				grid: {
					borderColor: '#e7e7e7',
					row: {
						colors: ['#f3f3f3', 'transparent'],
						opacity: 0.5
					},
				},
				chart: {
					toolbar: {
						show: true,
						zoom: {
							enabled: true,
						}
					},
					dropShadow: {
						enabled: true,
						color: '#000',
						top: 18,
						left: 7,
						blur: 10,
						opacity: 0.1
					},
				},
				plotOptions: {
					bar: {
						horizontal: false,
						borderRadius: 0,
						columnWidth: '30%',
						barHeight: '10%',
						distributed: false,
						rangeBarOverlap: true,
						rangeBarGroupRows: false,
						colors: {
							ranges: [{
								from: 0,
								to: 0,
								color: undefined
							}],
							backgroundBarColors: [],
							backgroundBarOpacity: 1,
							backgroundBarRadius: 0,
						},
						dataLabels: {
							position: 'top',
							maxItems: 100,
							hideOverflowingLabels: true,
						}
					}
				},
				colors: ['#eb5255', '#FFA500', '#33b2df'],
			};
			return (
				<Chart options={options} series={series} type="bar" height={380} />
			)
		}
		else {
			if (selectedButton === "Week") {
				data = energyWeeklyChart
			}
			if (selectedButton === "Month") {
				data = energyMonthlyChart
			}
			if (selectedButton === "Year") {
				data = energyYearlyData
			}
			if (selectedButton === "Custom" && customButton != null) {
				data = energyCustomChart
			}


			data.map((v => {
				time.push(this.timeConverter(v.previousDt))
				seriesData.push(v.energyConsumption.toFixed(2))
				return ""
			}))
			series = [
				{ name: "Energy Consumption", data: seriesData }
			]
			options = {

				xaxis: {
					type: 'date',
					categories: time,
					tickPlacement: 8,
					labels: {
						show: true,
						formatter: function (val) {
							return moment(new Date(val)).format('Do MMM YYYY'); // formats to hours:minutes
						}
					}
				},
				stroke: {
					width: 2,
					curve: 'smooth',
				},
				dataLabels: {
					enabled: false,
					dropShadow: {
						enabled: true
					}
				},
				title: {
					text: "Energy Consumption (kWH)",
					align: 'left',
					offsetX: 7,
					offsetY: 7,
					style: {
						fontSize: '17px',
						fontWeight: "bold",
						color: "rgb(33, 33, 33)",
						fontFamily: "Roboto, sans-serif",
					},
				},
				tooltip: {
					theme: 'dark',
				},
				fill: {
					opacity: [0.85, 0.25, 1],
					gradient: {
						inverseColors: false,
						shade: 'light',
						type: "vertical",
						opacityFrom: 0.85,
						opacityTo: 0.55,
						stops: [0, 100, 100, 100]
					}
				},
				legend: {
					position: 'bottom',
					showForSingleSeries: true,
					fontWeight: "bold",
					onItemClick: {
						toggleDataSeries: true
					}
				},
				grid: {
					borderColor: '#e7e7e7',
					row: {
						colors: ['#f3f3f3', 'transparent'],
						opacity: 0.5
					},
				},
				chart: {
					toolbar: {
						show: true,
						zoom: {
							enabled: true,
						}
					},
					dropShadow: {
						enabled: true,
						color: '#000',
						top: 18,
						left: 7,
						blur: 10,
						opacity: 0.1
					},
				},
				plotOptions: {
					bar: {
						horizontal: false,
						borderRadius: 0,
						columnWidth: '30%',
						barHeight: '10%',
						distributed: false,
						rangeBarOverlap: true,
						rangeBarGroupRows: false,
						colors: {
							ranges: [{
								from: 0,
								to: 0,
								color: undefined
							}],
							backgroundBarColors: [],
							backgroundBarOpacity: 1,
							backgroundBarRadius: 0,
						},
						dataLabels: {
							position: 'top',
							maxItems: 100,
							hideOverflowingLabels: true,
						}
					}
				},
				colors: ['#eb5255', '#FFA500', '#33b2df'],
			};
			return (
				<Chart options={options} series={series} type="bar" height={380} />
			)
		}
	}

	monthConsumption = (energyMonthlyChart) => {
		if (energyMonthlyChart.length !== 0) {
			var date = energyMonthlyChart.filter(function (obj) {
				if ('previousDt' in obj) {
					return true;
				} else {
					return false;
				}
			}).map(function (obj) { return obj['previousDt']; });

			var monthcons = energyMonthlyChart.filter(function (obj) {
				if ('cumEnergyVal' in obj) {
					return true;
				} else {
					return false;
				}
			}).map(function (obj) { return obj['cumEnergyVal']; });

			month[0] = moment(date[date.length - 1]).format('MMM')
			month[1] = monthcons[monthcons.length - 1].toFixed(2)

		}
		else {
			month[0] = moment().format('MMM')
			month[1] = "0.00"
		}

		/**@Month consumption finding in below 2 ways - Don't delete it */
		// energyMonthlyChart && energyMonthlyChart.map((v, i) => {
		// 	if (energyMonthlyChart.length === i + 1) {
		// 		month = moment(v.previousDt).format('MMM')
		// 		return ""
		// 	} else { return "" }
		// })

		// var temp = energyMonthlyChart.slice(-1).pop()
		// // eslint-disable-next-line
		// for (let i in temp) {
		// 	month[0] = moment(temp.previousDt).format('MMM')
		// 	month[1] = temp.monthConsumption.toFixed(2)
		// }
	}

	monthIconSelection = () => {
		if (month[0] === "Jan") return (<img src="https://img.icons8.com/cute-clipart/64/000000/january.png" alt="month" style={{ marginRight: "12px" }} />)
		if (month[0] === "Feb") return (<img src="https://img.icons8.com/cute-clipart/64/000000/february.png" alt="month" style={{ marginRight: "12px" }} />)
		if (month[0] === "Mar") return (<img src="https://img.icons8.com/cute-clipart/64/000000/march.png" alt="month" style={{ marginRight: "12px" }} />)
		if (month[0] === "Apr") return (<img src="https://img.icons8.com/cute-clipart/64/000000/april.png" alt="month" style={{ marginRight: "12px" }} />)
		if (month[0] === "May") return (<img src="https://img.icons8.com/cute-clipart/64/000000/may.png" alt="month" style={{ marginRight: "12px" }} />)
		if (month[0] === "Jun") return (<img src="https://img.icons8.com/cute-clipart/64/000000/june.png" alt="month" style={{ marginRight: "12px" }} />)
		if (month[0] === "Jul") return (<img src="https://img.icons8.com/cute-clipart/64/000000/july.png" alt="month" style={{ marginRight: "12px" }} />)
		if (month[0] === "Aug") return (<img src="https://img.icons8.com/cute-clipart/64/000000/august.png" alt="month" style={{ marginRight: "12px" }} />)
		if (month[0] === "Sept") return (<img src="https://img.icons8.com/cute-clipart/64/000000/september.png" alt="month" style={{ marginRight: "12px" }} />)
		if (month[0] === "Oct") return (<img src="https://img.icons8.com/cute-clipart/64/000000/october.png" alt="month" style={{ marginRight: "12px" }} />)
		if (month[0] === "Nov") return (<img src="https://img.icons8.com/cute-clipart/64/000000/november.png" alt="month" style={{ marginRight: "12px" }} />)
		if (month[0] === "Dec") return (<img src="https://img.icons8.com/cute-clipart/64/000000/december.png" alt="month" style={{ marginRight: "12px" }} />)
	}

	shiftA = (a) => {
		let shifta = 0
		Object.values(a).map((item) => (
			(item.shiftName === "Shift A") ?
				shifta = shifta + item.shiftEnergyVal
				: ""
		))
		todayconsume = shifta
		return shifta;
	}

	shiftB = (b) => {
		let shiftb = 0
		Object.values(b).map((item) => (
			(item.shiftName === "Shift B") ?
				shiftb = shiftb + item.shiftEnergyVal
				: ""
		))
		todayconsume += shiftb
		return shiftb;
	}

	shiftC = (c) => {
		let shiftc = 0
		Object.values(c).map((item) => (
			(item.shiftName === "Shift C") ?
				shiftc = shiftc + item.shiftEnergyVal
				: ""
		))
		todayconsume += shiftc
		return shiftc;
	}

	/** shifwise Consumption maily needs it - Don't delete it */
	// shiftwiseReport = (selectedButton, shiftDailyData, shiftWeeklyData, shiftMonthlyData, shiftCustomData, shiftYearlyData) => {
	// 	if (selectedButton === "Day") {
	// 		useBtn = shiftDailyData
	// 	}
	// 	if (selectedButton === "Week") {
	// 		useBtn = shiftWeeklyData
	// 	}
	// 	if (selectedButton === "Month") {
	// 		useBtn = shiftMonthlyData
	// 	}
	// 	if (selectedButton === "Year") {
	// 		useBtn = shiftYearlyData
	// 	}
	// 	if (selectedButton === "Custom") {
	// 		useBtn = shiftCustomData
	// 	}
	// }


	// callback = (id, phase, actualTime, baseTime, startTime, commitTime) => {
	// 	console.table({ id, phase, actualTime, baseTime, startTime, commitTime })
	// }

	/** rendering Dashboard information. */
	render() {
		const { classes, selectedButton, customButton, energyDailyChart,
			energyWeeklyChart, energyMonthlyChart, energyCustomChart,
			// shiftMonthlyChart,
			shiftDailyData,
			// shiftWeeklyData, shiftMonthlyData, shiftCustomData,
			energyYearlyData, shiftYearlyData
		} = this.props;
		return (
			<>
				<div className={classes.device}>
					<h3 className={classes.machinetitle}>
						<Suspense>
							<Device />
						</Suspense>
					</h3>
					<div className={classes.machineheader}><Suspense><Modal /></Suspense></div>
				</div>

				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} md={12}>
						<div className={classes.dashboardbtn}>
							<Link style={{ textDecoration: 'none', color: 'white' }} to="/energy-meter-real-time">
								<LightTooltip title={`Live Dashboard`}>
									<IconButton color="inherit" className={classes.myClassName}>
										<i className='bx bx-grid-alt' animation='tada'></i>
									</IconButton>
								</LightTooltip>
							</Link>
						</div>
					</Grid>

					<Grid item xs={12} sm={12} md={4}>
						<Card className={classes.firstcarda}>

							<Card className={classes.carda}
							// component={motion.div}
							// whileHover={{
							// 	scale: 1.2,
							// 	transition: { duration: 0.3 }
							// }}
							// whileTap={{ scale: 0.9 }}
							>
								<div className={classes.first} 
								// ref={el => this.myElement = el}
								>
									<div className={classes.icon}>
										<img src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-clock-christmas-flatart-icons-flat-flatarticons.png" alt="clock" />
									</div>
									<div className={classes.firstinnertxt}>
										{/* *@Finding today's consume using energydailychart method - Don't delete it */}
										{/* {energyDailyChart.length !== 0 ?
											energyDailyChart.map((v, i) => {
												return <p style={{ margin: 0 }} key={i}>{Math.round(v.energyConsumption)} kWh</p>
											})
											: <p style={{ margin: 0 }}>0.00 kWh</p>
										} */}
										<p style={{ margin: 0 }}>{todayconsume.toFixed(2)} kWh</p>
										<p style={{ margin: 0 }} ref={el => this.myElement = el} >Today's Consumption</p>
									</div>
								</div>
							</Card>


							{this.monthConsumption(energyMonthlyChart)}
							<Card className={classes.carda} style={{ background: "#FEC9B4" }}>
								<div className={classes.second}>
									<div className={classes.icon}>{this.monthIconSelection()}</div>
									<div className={classes.firstinnertxt}>
										<p style={{ margin: 0 }} >{month[1]} kWh</p>
										<p style={{ margin: 0 }}>Month Consumption</p>
									</div>
								</div>
							</Card>

							<div className={classes.shiftHeader}>
								<span style={{ display: "flex", justifyContent: "center" }}>Shiftwise Consumption</span>
								<Divider style={{ background: "#fff" }} />

								{/* *@Needed for shiftwise Consumption grid - Don't delete it */}
								{/* {this.shiftwiseReport(selectedButton, shiftDailyData, shiftWeeklyData, shiftMonthlyData, shiftCustomData, shiftYearlyData)} */}
								<table style={{ textAlign: "center", width: "90%" }}>
									<tbody>
										<tr>
											<td style={{ width: "50%" }}>Shift A</td>
											{/* <td>{this.shiftA(useBtn)} kWh</td> */}
											<td>{this.shiftA(shiftDailyData).toFixed(2)} kWh</td>
										</tr>
										<tr>
											<td style={{ width: "50%" }}>Shift B</td>
											{/* <td>{this.shiftB(useBtn)} kWh</td> */}
											<td>{this.shiftB(shiftDailyData).toFixed(2)} kWh</td>
										</tr>
										<tr>
											<td style={{ width: "50%" }}>Shift C</td>
											{/* <td>{this.shiftC(useBtn)} kWh</td> */}
											<td>{this.shiftC(shiftDailyData).toFixed(2)} kWh</td>
										</tr>
									</tbody>
								</table>
							</div>
						</Card>
					</Grid>

					<Grid item xs={12} sm={12} md={8}>
						<Card style={{ borderRadius: "15px" }}>
							{this.energyConsumptionChart(selectedButton, customButton, energyDailyChart, shiftDailyData, energyWeeklyChart, energyMonthlyChart, energyCustomChart, energyYearlyData, shiftYearlyData)}
						</Card>
					</Grid>

					<Grid item xs={12} sm={12} md={6}>
						<Card style={{ borderRadius: "15px" }}>
							<center><h3 className={classes.tableHeader}>Energy Consumption - Daily</h3></center>
							<Suspense>
								<EnergyTable />
							</Suspense>
						</Card>
					</Grid>

					<Grid item xs={12} sm={12} md={6}>
						<Card style={{ borderRadius: "15px" }}>
							<center><h3 className={classes.tableHeader}>Energy Consumption - Shiftwise</h3></center>
							<Suspense>
								<ShiftTable />
							</Suspense>
						</Card>
					</Grid>
				</Grid>
				{/* <iframe src="http://184.73.50.107:5252/Dashboard?LoginName=Operator" ></iframe> */}
			</>

		);
	}
}


/** Get data from store and assign to props. */
const mapStateToProps = (state) => {
	return {
		selectedButton: state.loggedReducer.btn,
		customButton: state.loggedReducer.custombtn,

		energyDailyChart: state.loggedReducer.energydaily,
		energyWeeklyChart: state.loggedReducer.energyweekly,
		energyMonthlyChart: state.loggedReducer.energymonthly,
		energyCustomChart: state.loggedReducer.energycustomly,

		shiftDailyData: state.loggedReducer.shiftdaily,
		shiftWeeklyData: state.loggedReducer.shiftweekly,
		shiftMonthlyData: state.loggedReducer.shiftmonthly,

		energyYearlyData: state.loggedReducer.energyyearly,
		shiftYearlyData: state.loggedReducer.shiftyearly,
		shiftCustomData: state.loggedReducer.shiftcustomly,


	}
};

export default React.memo(connect(
	mapStateToProps
)(withStyles(Dashstyles1)(Dashboard1)));

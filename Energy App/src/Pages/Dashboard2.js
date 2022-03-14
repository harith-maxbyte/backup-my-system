import React, { PureComponent } from 'react';
import { Grid, Card, Paper, Divider, IconButton } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import Chart from 'react-apexcharts'
import Device from "./Device"
import axios from 'axios';
import Dashstyles2 from './Dashboardstyles2'
import { Link } from "react-router-dom";
import moment from 'moment';
import electricity from '../assets/images/png/electricity.png';
import highVoltage from "../assets/images/png/high-voltage.png"
import { START_TIME, END_TIME } from "../Helpers/Constatnt"


/**
 * @class
 * Class representing Dashboard component
 */
class Dashboard2 extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			val: [],
			current: 0.00,
			energy: 0.00,
			Powerfactor: 0.00,
			voltage: 0.00,

			current1: 0.00,
			energy1: 0.00,
			Powerfactor1: 0.00,
			voltage1: 0.00,

			current2: 0.00,
			energy2: 0.00,
			Powerfactor2: 0.00,
			voltage2: 0.00,
		}
	}

	componentDidMount() {
		this.loadData(localStorage.getItem("Device"))
	}

	/**
	* @INTIAL_LOAD
	*  required method
	*/
	loadData = (device) => {
		axios.get(`https://janaaticsfunctionapp.azurewebsites.net/api/GetTimeSeriesData?code=5rUZrumKciSJ7bfhQjR38Qxkk7nUhTNR63phSsDHQOyRCisQ3CeuBA==&deviceid=${device}&startTime=${START_TIME}&endTime=${END_TIME}`)
			.then(res => {
				this.setState({ val: res.data });
			})
			.then(v => {
				if (this.state.val.length > 0) {
					var t = []
					// eslint-disable-next-line
					this.state.val && this.state.val.length > 0 && this.state.val.map((v) => {
						// var parsed = [v.data.slice(0, 1), '"', v.data.slice(1)].join('');
						// t.push(JSON.parse(parsed))
						t.push(JSON.parse(v.data))
					})

					if ((t.pop().Current) && (!t.pop().Current1)) {
						this.setState({
							current: t.pop().Current,
							energy: t.pop().Energy,
							Powerfactor: t.pop().Powerfactor,
							voltage: t.pop().Voltage,
						})
					}
					else if (((t.pop().Current) && (t.pop().Current1)) || (t.pop().Current2)) {
						this.setState({
							current: t.pop().Current,
							energy: t.pop().Energy,
							Powerfactor: t.pop().Powerfactor,
							voltage: t.pop().Voltage,

							current1: t.pop().Current1,
							energy1: t.pop().Energy1,
							Powerfactor1: t.pop().Powerfactor1,
							voltage1: t.pop().Voltage1,
						})

					}
					else {
						this.setState({
							current: t.pop().Current,
							energy: t.pop().Energy,
							Powerfactor: t.pop().Powerfactor,
							voltage: t.pop().Voltage,

							current1: t.pop().Current1,
							energy1: t.pop().Energy1,
							Powerfactor1: t.pop().Powerfactor1,
							voltage1: t.pop().Voltage1,

							current2: t.pop().Current2,
							energy2: t.pop().Energy2,
							Powerfactor2: t.pop().Powerfactor2,
							voltage2: t.pop().Voltage2,
						})

					}
				}
				else {
					this.setState({
						current: 0.00,
						energy: 0.00,
						Powerfactor: 0.00,
						voltage: 0.00,
					})
				}
			})
			.catch(err => { })
	}

	/**
	* @function
	* all required functions.
	*/
	timeConverter = (UNIX_timestamp) => {
		var a = new Date(UNIX_timestamp * 1000);
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;// + ':' + sec
		return time;
	}

	returnCurrentChart = () => {
		let totaldatas = []
		let time = []
		let phase1 = []
		let phase2 = []
		let phase3 = []
		var series = []

		// eslint-disable-next-line
		this.state.val && this.state.val.length > 0 && this.state.val.map((v) => {
			// var parsed = [v.data.slice(0, 1), '"', v.data.slice(1)].join('');
			totaldatas.push(JSON.parse(v.data))
		})

		// eslint-disable-next-line
		totaldatas.map((v => {
			time.push(this.timeConverter(v.Timestamp))
			if (v.Current && !v.Current1) {
				phase1.push(v.Current)
				series = [
					{ name: "Phase 1", data: phase1 }
				]
			}

			// eslint-disable-next-line
			else if (v.Current && v.Current1 || v.Current2) {
				phase1.push(v.Current)
				phase2.push(v.Current1)
				series = [
					{ name: "Phase 1", data: phase1 },
					{ name: "Phase 2", data: phase2 }
				]
			}
			else {
				phase1.push(v.Current)
				phase2.push(v.Current1)
				phase3.push(v.Current2)
				series = [
					{ name: "Phase 1", data: phase1 },
					{ name: "Phase 2", data: phase2 },
					{ name: "Phase 3", data: phase3 }
				]
			}
		}))

		var options = {

			xaxis: {
				type: 'datetime',
				categories: time,
				tickAmount: 7,
				labels: {
					show: true,
					formatter: function (val) {
						return moment(new Date(val)).format("h:mm a")
					}
				},
				tooltip: {
					enabled: false,
					formatter: function (val) {
						return moment(new Date(val)).format("dddd, MMMM Do YYYY")
					}
				},
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
				text: "Current (A)",
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
				x: {
					format: 'dd MMM',
					formatter: function (val) {
						return moment(new Date(val)).format("ddd, Do MMM YYYY, h:mm:ss a")
					}
				},
			},

			// fill: {
			// 	opacity: 1
			// },
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
				},
				markers: {
					radius: 3,
				}
			},
			grid: {
				borderColor: '#e7e7e7',
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
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
			colors: ['#eb5255', '#FFA500', '#33b2df'],

		};
		return (
			<Chart options={options} series={series} type="line" height={300} />
		)
	}

	returnVoltageChart = () => {
		let totaldatas = []
		let time = []
		var series = []
		let phase1 = []
		let phase2 = []
		let phase3 = []

		// eslint-disable-next-line
		this.state.val && this.state.val.length > 0 && this.state.val.map((v) => {
			// var parsed = [v.data.slice(0, 1), '"', v.data.slice(1)].join('');
			totaldatas.push(JSON.parse(v.data))
		})

		// eslint-disable-next-line
		totaldatas.map((v => {
			time.push(this.timeConverter(v.Timestamp))
			if (v.Voltage || !v.Voltage1) {
				phase1.push(v.Voltage)
				series = [
					{ name: "Phase 1", data: phase1 },
				]
			}
			// eslint-disable-next-line
			else if (v.Voltage && v.Voltage1 || v.Voltage2) {
				phase1.push(v.Voltage)
				phase2.push(v.Voltage1)
				series = [
					{ name: "Phase 1", data: phase1 },
					{ name: "Phase 2", data: phase2 }
				]
			}
			else {
				phase1.push(v.Voltage)
				phase2.push(v.Voltage1)
				phase3.push(v.Voltage2)
				series = [
					{ name: "Phase 1", data: phase1 },
					{ name: "Phase 2", data: phase2 },
					{ name: "Phase 3", data: phase3 }
				]
			}
		}))

		var options = {
			// series: [{
			// 	name: "Phase 1",
			// 	data: phase1,
			// }],
			xaxis: {
				type: 'datetime',
				categories: time,
				tickAmount: 7,
				labels: {
					show: true,
					formatter: function (val) {
						return moment(new Date(val)).format("h:mm a")//"h:mm a"
					}
				},
				tooltip: {
					enabled: false,
					formatter: function (val) {
						return moment(new Date(val)).format("dddd, MMMM Do YYYY")
					}
				},
			},
			stroke: {
				width: 2,
				curve: 'smooth',
			},
			tooltip: {
				theme: 'dark',
				x: {
					format: 'dd MMM',
					formatter: function (val) {
						return moment(new Date(val)).format("ddd, Do MMM YYYY, h:mm:ss a")
					}
				},
			},
			dataLabels: {
				enabled: false,
				dropShadow: {
					enabled: true
				}
			},
			title: {
				text: "Voltage (V)",
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


			fill: {
				opacity: 1
			},
			legend: {
				position: 'bottom',
				showForSingleSeries: true,
				fontWeight: "bold",
				onItemClick: {
					toggleDataSeries: true
				},
				markers: {
					radius: 3,
				},
				labels: {
					show: true,
					formatter: function (val, timestamp) {
						return moment(new Date(timestamp)).format("MM/DD/YYYY"); // formats to hours:minutes
					}
				}
			},
			grid: {
				borderColor: '#e7e7e7',
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
					opacity: 0.5
				},
			},
			chart: {
				toolbar: {
					show: true,
					zoom: {
						enabled: true,
					},
				},
				dropShadow: {
					enabled: true,
					color: '#000',
					top: 18,
					left: 7,
					blur: 10,
					opacity: 0.1
				},
				zoom: {
					enabled: true,
				},
				// tooltip: {
				// 	enabled: true,
				// 	formatter: function (val, timestamp) {
				// 		return moment(val).format("dddd, MMMM Do YYYY, h:mm:ss a")
				// 	}
				// },

			},
			colors: ['#eb5255', '#FFA500', '#33b2df'],

		};
		return (
			<Chart options={options} series={series} type="line" height={300} />
		)
	}
	returnEnergyChart = () => {
		let totaldatas = []
		let time = []
		var series = []
		let phase1 = []
		let phase2 = []
		let phase3 = []

		// eslint-disable-next-line
		this.state.val && this.state.val.length > 0 && this.state.val.map((v) => {
			// var parsed = [v.data.slice(0, 1), '"', v.data.slice(1)].join('');
			totaldatas.push(JSON.parse(v.data))
		})

		// totaldatas.map((v => {
		// 	time.push(this.timeConverter(v.Timestamp))
		// 	// time.push(v.Timestamp)
		// 	current.push(v.Energy)
		// }))

		// eslint-disable-next-line
		totaldatas.map((v => {
			time.push(this.timeConverter(v.Timestamp))
			if (v.Energy || !v.Energy1) {
				phase1.push(v.Energy)
				series = [
					{ name: "Phase 1", data: phase1 },
				]
			}
			// eslint-disable-next-line
			else if (v.Energy && v.Energy1 || v.Energy2) {
				phase1.push(v.Energy)
				phase2.push(v.Energy1)
				series = [
					{ name: "Phase 1", data: phase1 },
					{ name: "Phase 2", data: phase2 }
				]
			}
			else {
				phase1.push(v.Energy)
				phase2.push(v.Energy1)
				phase3.push(v.Energy2)
				series = [
					{ name: "Phase 1", data: phase1 },
					{ name: "Phase 2", data: phase2 },
					{ name: "Phase 3", data: phase3 }
				]
			}
		}))

		var options = {
			// series: [{
			// 	name: "Phase 1",
			// 	data: current,
			// }],
			xaxis: {
				type: 'datetime',
				categories: time,
				// min: new Date(new Date().setHours(0, 0, 0, 0)).getTime(), // start date
				// max: new Date(new Date().setHours(24, 0, 0, 0)).getTime(), // end date
				tickAmount: 7, // interval you want
				labels: {
					show: true,
					formatter: function (val) {
						return moment(new Date(val)).format("h:mm a")
					}
				},
				tooltip: {
					enabled: false,
					formatter: function (val) {
						return moment(new Date(val)).format("dddd, MMMM Do YYYY")
					}
				},
			},
			yaxis: {
				tickAmount: 3,
				min: Math.min(...phase1) - 0.01,
				max: Math.max(...phase1) + 0.01,
			},
			tooltip: {
				theme: 'dark',
				x: {
					format: 'dd MMM',
					formatter: function (val) {
						return moment(new Date(val)).format("ddd, Do MMM YYYY, h:mm:ss a")
					}
				},
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
				text: "Load (kWH)",
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

			fill: {
				opacity: 1
			},
			legend: {
				position: 'bottom',
				showForSingleSeries: true,
				fontWeight: "bold",
				onItemClick: {
					toggleDataSeries: true
				},
				markers: {
					radius: 3,
				}
			},
			grid: {
				borderColor: '#e7e7e7',
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
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
				zoom: {
					enabled: true,
				}

			},
			colors: ['#eb5255', '#FFA500', '#33b2df'],

		};
		return (
			<Chart options={options} series={series} type="line" height={300} />
		)
	}
	returnPowerfactorChart = () => {
		let totaldatas = []
		let time = []
		var series = []
		let phase1 = []
		let phase2 = []
		let phase3 = []


		// eslint-disable-next-line
		this.state.val && this.state.val.length > 0 && this.state.val.map((v) => {
			// var parsed = [v.data.slice(0, 1), '"', v.data.slice(1)].join('');
			totaldatas.push(JSON.parse(v.data))
		})

		// eslint-disable-next-line
		totaldatas.map((v => {
			time.push(this.timeConverter(v.Timestamp))
			if (v.Powerfactor || !v.Powerfactor1) {
				phase1.push(v.Powerfactor)
				series = [
					{ name: "Phase 1", data: phase1 },
				]
			}
			// eslint-disable-next-line
			else if (v.Powerfactor && v.Powerfactor1 || v.Powerfactor2) {
				phase1.push(v.Powerfactor)
				phase2.push(v.Powerfactor1)
				series = [
					{ name: "Phase 1", data: phase1 },
					{ name: "Phase 2", data: phase2 }
				]
			}
			else {
				phase1.push(v.Powerfactor)
				phase2.push(v.Powerfactor1)
				phase3.push(v.Powerfactor2)
				series = [
					{ name: "Phase 1", data: phase1 },
					{ name: "Phase 2", data: phase2 },
					{ name: "Phase 3", data: phase3 }
				]
			}
		}))

		var options = {
			// series: [{
			// 	name: "Phase 1",
			// 	data: current,
			// }],
			xaxis: {
				type: 'datetime',
				categories: time,
				// min: new Date(new Date().setHours(0, 0, 0, 0)).getTime(), // start date
				// max: new Date(new Date().setHours(24, 0, 0, 0)).getTime(), // end date
				tickAmount: 7, // interval you want
				labels: {
					show: true,
					formatter: function (val) {
						return moment(val).format("h:mm a")
					}
				},
				tooltip: {
					enabled: false,
					formatter: function (val) {
						return moment(new Date(val)).format("dddd, MMMM Do YYYY")
					}
				},
			},
			yaxis: {
				tickAmount: 4,
				min: Math.min(...phase1) - 0.01,
				max: Math.max(...phase1) + 0.01,
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
				text: "Power Factor (kW)",
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
				x: {
					format: 'dd MMM',
					formatter: function (val) {
						return moment(new Date(val)).format("ddd, Do MMM YYYY, h:mm:ss a")
					}
				},
			},
			fill: {
				opacity: 1
			},
			legend: {
				position: 'bottom',
				showForSingleSeries: true,
				fontWeight: "bold",
				onItemClick: {
					toggleDataSeries: true
				},
				markers: {
					radius: 3,
				}
			},
			grid: {
				borderColor: '#e7e7e7',
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
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
				zoom: {
					enabled: true,
				}

			},
			colors: ['#eb5255', '#FFA500', '#33b2df'],

		};
		return (
			<Chart options={options} series={series} type="line" height={300} />
		)
	}

	/** rendering Dashboard information. */
	render() {
		const { classes } = this.props;
		return (
			<>
				<div style={{ margin: 0, padding: 0, display: "flex", justifyContent: "flex-end", transition: "width 2s" }}>
					<img src="https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/58/000000/external-live-radio-vitaliy-gorbachev-flat-vitaly-gorbachev.png" alt="live" />
				</div>
				<div className={classes.device}>
					<Link style={{ textDecoration: 'none', color: 'white' }} to="/energy-meter-dashboard">
						<IconButton color="inherit" className={classes.myClassName}>
							<i className='bx bx-arrow-back'></i>
						</IconButton>
					</Link>
					<span style={{ display: "contents", fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "15px", color: "#fff" }}>
						<Device state="dashboard2" func={this.loadData} />
					</span>

				</div>


				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} md={3}>
						<Paper className={classes.carda}>
							<div className={classes.card__actions__total}>
								<img src={electricity} style={{ position: "relative", top: "-5%", maxWidth: "20%", height: "auto" }} alt="electricity" />
								<div className={classes.card__actions1}>
									<div className={classes.topval} style={{ color: "black" }}>
										Avg<span style={{ fontSize: "1rem" }}>.</span> Current(A)
									</div>
									<div className={classes.belowval} style={{ color: "black" }}>{this.state.current}</div>
								</div>
							</div>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>

						<Paper className={classes.cardb}>
							<div className={classes.card__actions__total}>
								<img src={highVoltage} style={{ position: "relative", top: "-5%", maxWidth: "20%", height: "auto" }} alt="electricity" />
								<div className={classes.card__actions1}>
									<div className={classes.topval} style={{ color: "black" }}>Avg<span style={{ fontSize: "1rem" }}>.</span> Voltage(V)</div>
									<div className={classes.belowval} style={{ color: "black" }}>{this.state.voltage}</div>
								</div>
							</div>
						</Paper>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<Paper className={classes.carda1} style={{ color: "black" }}>
							<span className={classes.rdtitle}>Load</span>

							<Divider style={{ background: "#fff" }} />
							<div className={classes.unorderlist}>
								<p className={classes.Loadtitle}>Power KW</p>
								<p className={classes.Loadvalue}>{this.state.energy}</p>
							</div>
							<div className={classes.unorderlist}>
								<p className={classes.Loadtitle}>KWH</p>
								<p className={classes.Loadvalue}>0.00</p>
							</div>
							<div className={classes.unorderlist}>
								<p className={classes.Loadtitle}>KVAH</p>
								<p className={classes.Loadvalue}>0.00</p>
							</div>
							<div className={classes.unorderlist}>
								<p className={classes.Loadtitle}>Power Factor</p>
								<p className={classes.Loadvalue}>{this.state.Powerfactor}</p>
							</div>
						</Paper>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<Paper className={classes.carda2} style={{ color: "black", background: "#F4CC44" }}>
							<div className={classes.rd1title} style={{ fontWeight: "600" }}>
								<span style={{ paddingLeft: "5%" }}>Phase</span>
								<span>Current(A)</span>
								<span>Voltage(V)</span>
							</div>
							<Divider style={{ background: "#fff" }} />
							<div className={classes.unorderlist1}>
								<p className={classes.phase}>Phase 1</p>
								<p className={classes.phase}>{this.state.current}</p>
								<p className={classes.phase}>{this.state.voltage}</p>
							</div>
							{this.state.energy1 !== 0.00 &&
								<div className={classes.unorderlist1}>
									<p className={classes.phase}>Phase 2</p>
									<p className={classes.phase}>0.00</p>
									<p className={classes.phase}>00.00</p>
								</div>
							}
							{this.state.energy2 !== 0.00 &&
								<div className={classes.unorderlist1}>
									<p className={classes.phase}>Phase 3</p>
									<p className={classes.phase}>0.00</p>
									<p className={classes.phase}>00.00</p>
								</div>
							}

						</Paper>
					</Grid>

				</Grid>


				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={6}>
						<Card className={classes.charts} style={{ marginTop: "1rem" }}>
							{this.returnCurrentChart()}
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<Card className={classes.charts} style={{ marginTop: "1rem" }}>
							{this.returnVoltageChart()}
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<Card className={classes.charts}>
							{this.returnEnergyChart()}
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<Card className={classes.charts}>
							{this.returnPowerfactorChart()}
						</Card>
					</Grid>
				</Grid>
				<Card>
				</Card>
			</>
		);
	}
}


export default React.memo((withStyles(Dashstyles2)(Dashboard2)));

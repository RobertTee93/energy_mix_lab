import Vue from 'vue';
import { GChart } from 'vue-google-charts';

document.addEventListener("DOMContentLoaded", () => {
	new Vue({
		el: "#app",
		components: {
			"gchart": GChart
		},
		data: {
			genMix: [],
			timeStart: "",
			timeEnd: "",
			genMixChart: [["fuel", "Percentage"]],
			dateFrom: null,
			dateTo: null,
			timeFrom: null,
			timeTo: null,
			dateTimeFrom: null,
			dateTimeTo: null
		},
		methods: {
			getGenMix: function(){
				fetch("https://api.carbonintensity.org.uk/generation")
				.then(result => result.json())
				.then(results => {
					this.genMix = results.data.generationmix;
					this.timeStart = results.data.from;
					this.timeEnd = results.data.to;
					this.getChartData();
				})
			},
			getChartData: function(){
				const empty_array = []
			  empty_array[0] = ["fuel", "percentage"]
				this.genMix.forEach(function(item) {
					empty_array.push([item.fuel, item.perc])
				})
				this.genMixChart = empty_array
			},
			getFormattedDate: function(){
				this.dateTimeFrom = this.dateFrom + "T" + this.timeFrom + "Z"
				this.dateTimeTo = this.dateTo + "T" + this.timeTo + "Z"
			}
		// 	getGenMixByDateTime: function(){
		// 		fetch("https://api.carbonintensity.org.uk/generation/" + this.dateTimeFrom + "/" + this.dateTimeTo)
		// 		.then(result => result.json())
		// 		.then(results => {
		// 			for((item) in results){
		// 			this.genMix = results.data.generationmix;
		// 			this.timeStart = results.data.from;
		// 			this.timeEnd = results.data.to;
		// 			this.getChartData();
		// 		}
		// 	});
		// }
		},
		mounted: function() {
			this.getGenMix()
		}
	})
});

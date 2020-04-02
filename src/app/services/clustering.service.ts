import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ClusteringService {
	private place_org_lat;
	private place_org_long;
	private is_cluster;
	private markers_count;

	constructor() {
	}

	public distance(cluster) {
		const p = Math.PI / 180;
		const a = 0.5 - Math.cos((parseFloat(cluster.lat) - this.place_org_lat) * p) / 2 +
			Math.cos(this.place_org_lat * p) * Math.cos(parseFloat(cluster.lat) * p) *
			(1 - Math.cos((parseFloat(cluster.lng) - this.place_org_long) * p)) / 2;
		return 12742.2 * Math.asin(Math.sqrt(a))
	}

	public merge(cluster) {
		this.place_org_lat = (this.place_org_lat * this.markers_count 
			+ parseFloat(cluster.lat) * parseInt(cluster.total)) / 
			(this.markers_count + parseInt(cluster.total));
		this.place_org_long = (this.place_org_long * this.markers_count + 
			parseFloat(cluster.lng) * parseInt(cluster.total)) / 
			(this.markers_count + parseInt(cluster.total));
		this.markers_count += parseInt(cluster.total);
	}

	public make_clusters(objects, zoom_lvl) {
		var max_dist = 0.0025 * Math.pow(2, 22 - zoom_lvl);
		var clusters = [];
		for (var i = 0; i < objects.length; i++) {
			var closest_dist = 1000000;
			var closest_cluster = null;
			var cur_dist;
			for (var j = 0; j < clusters.length; j++) {
				cur_dist = this.distance(objects[i]);
				if (cur_dist < closest_dist) {
					closest_cluster = clusters[j];
					closest_dist = cur_dist;
				}
			}
			if (closest_dist <= max_dist) {
				this.merge(objects[i]);
			} else {
				this.place_org_lat = parseFloat(objects[i].lat);
				this.place_org_long = parseFloat(objects[i].lng);
				this.markers_count = parseInt(objects[i].total);
				this.is_cluster = true;
				clusters.push(objects[i]);
			}
		}
		return clusters;
	}
}

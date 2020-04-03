import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ClusteringService {

  distance(cluster1, cluster2) {
    var p = Math.PI/180;
    var a = 0.5 - Math.cos((cluster1.lat-cluster2.lat)*p)/2 + Math.cos(cluster2.lat*p) * Math.cos(cluster1.lat*p) * (1-Math.cos((cluster1.lng-cluster2.lng)*p))/2;
    return 12742.2 * Math.asin(Math.sqrt(a))
  }

  merge(cluster1, cluster2) {
    cluster1.lat = (cluster1.lat*cluster1.total+cluster2.lat*cluster2.total)/(cluster1.total+cluster2.total);
    cluster1.lng = (cluster1.lng*cluster1.total+cluster2.lng*cluster2.total)/(cluster1.total+cluster2.total);
    cluster1.total += cluster2.total;
  }

  make_clusters(objects, zoom_lvl) {
    var max_dist = 0.0025*Math.pow(2, 22-zoom_lvl);
    var clusters = [];
    for (var i=0; i<objects.length; i++) {
      var closest_dist = 1000000;
      var closest_cluster = null;
      objects[i].total = 1.0 * objects[i].total;
      var cur_dist;
      for (var j=0; j<clusters.length; j++) {
        cur_dist = this.distance(clusters[j], objects[i]);
        if (cur_dist < closest_dist) {
          closest_cluster = clusters[j];
          closest_dist = cur_dist;
        }
      }
      if (closest_dist <= max_dist) {
        this.merge(closest_cluster, objects[i]);
      } else {
        clusters.push(objects[i]);
      }
    }
    return clusters;
  }
}

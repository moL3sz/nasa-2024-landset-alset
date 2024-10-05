/*
 * Copyright (C) 2019-2021 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import {GeoCoordinates, sphereProjection} from "@here/harp-geoutils";
import {Theme} from "@here/harp-datasource-protocol";
import {LongPressHandler, MapControls, MapControlsUI} from "@here/harp-map-controls";
import {AtmosphereLightMode, MapView, MapViewAtmosphere, MapViewEventNames} from "@here/harp-mapview";
import {APIFormat, AuthenticationMethod, VectorTileDataSource} from "@here/harp-vectortile-datasource";
import * as THREE from "three"
import {TLEType} from "./@types/tle.type.ts";
import {calculatelonlat} from "../../../../utils/calculatelonlat.ts";
import Marker from "../../../../assets/marker.png"

const defaultTheme = "resources/berlin_tilezen_base_globe.json";

export interface ViewParameters {
	theme?: string | Theme;
	canvas: HTMLCanvasElement;
}

export class View {
	readonly canvas: HTMLCanvasElement;
	readonly theme: string | Theme;
	private tle: TLEType | null;
	readonly mapView: MapView;

	constructor(args: ViewParameters) {
		this.canvas = args.canvas;
		this.theme = args.theme === undefined ? defaultTheme : args.theme;
		this.mapView = this.initialize();
	}

	async fetchTLE(){

		const res = await fetch("http://localhost:4000/api/v1/tle/latest");
		const data = await res.json();
		this.tle = data as TLEType

	}

	createMarker(){
		// 2D marker kép textúra betöltése
		const textureLoader = new THREE.TextureLoader();
		const markerTexture = textureLoader.load(Marker); // Töltsd be a saját képedet (pl. marker.png)

// Sprite Material létrehozása a textúrával
		const spriteMaterial = new THREE.SpriteMaterial({ map: markerTexture });
		const markerSprite = new THREE.Sprite(spriteMaterial);
		markerSprite.scale.set(500, 500, 1); // A méret beállítása (szélesség, magasság)
		return markerSprite;
	}
	updateSize(zoom: number){
		const size = (Math.pow(13,1.1)-Math.pow(zoom, 1.1)) * 200
		this.mapView.mapAnchors.children.forEach((e)=>{
			if(e.type === "Sprite"){
				e.scale.set(size, size, 2);

			}
		})
	}

	addMouseEventListener(){


		return new LongPressHandler(this.canvas, event=>{
			const mapView = this.mapView;
			// snippet:harp_gl_threejs_add_simple_object_1.ts
			// Get the position of the mouse in geo space.
			const geoPosition = mapView.getGeoCoordinatesAt(event.pageX, event.pageY);
			if (geoPosition === null) {
				return;
			}
			// Add somealtitude so that the cube is standing on the ground.
			geoPosition.altitude = 100;

			console.log(geoPosition)
			const marker = this.createMarker();
			marker.anchor = geoPosition;
			mapView.mapAnchors.add(marker);

			// end:harp_gl_threejs_add_simple_object_1.ts

			mapView.update();
		})
	}
	protected initialize(): MapView {


		this.fetchTLE();


		const mapView = new MapView({
			canvas: this.canvas,
			theme: this.theme,
			projection: sphereProjection,
			decoderUrl: "decoder.bundle.js",
			enableShadows: true,
			zoomLevel: 6,
			tileCacheSize: 1000000
		});

		const mapControls = new MapControls(mapView);


		const ui = new MapControlsUI(mapControls, {zoomLevel: "input", projectionSwitch: true});
		this.canvas.parentElement!.appendChild(ui.domElement);
		const dataSource = new VectorTileDataSource({
			authenticationCode: "potDvX8kpGN0LQGCF9hbwvpkUCBr4rvFKgGwzGYi1MM",
			baseUrl: "https://vector.hereapi.com/v2/vectortiles/base/mc",
			apiFormat: APIFormat.XYZOMV,
			styleSetName: "tilezen",
			authenticationMethod: {
				method: AuthenticationMethod.QueryString,
				name: "apiKey"
			},

		});

		mapView.addDataSource(dataSource);


		MapControls.create(mapView);

		const {camera, projection, mapAnchors} = mapView;
		const updateCallback = () => mapView.update();
		const atmosphere = new MapViewAtmosphere(
			mapAnchors,
			camera,
			projection,
			mapView.renderer.capabilities,
			updateCallback
		);


		const ellipticalRender = () => {
			const scale = 6371*1000 + 705 * 1000;
			const curve = new THREE.EllipseCurve(
				0, 0,
				scale, scale,
				0, 2 * Math.PI,
				false,
				1,
			);


			const points = curve.getPoints(100);
			const geometry = new THREE.BufferGeometry().setFromPoints(points);

			const material = new THREE.LineBasicMaterial({color: 0xff0000});

			const ellipse = new THREE.Line(geometry, material);
			ellipse.anchor = mapView.camera;


			return {ellipse,points};
		}




		const scale = 40*1000;
		const geometry = new THREE.BoxGeometry(1 * scale, 1 * scale, 1 * scale);
		const material = new THREE.MeshStandardMaterial({
			color: 0x00ff00fe
		});
		// Return a pink cube.
		function createPinkCube() {
			const mesh = new THREE.Mesh(geometry, material);
			// Make sure the cube overlaps everything else, is completely arbitrary.
			mesh.renderOrder = Number.MAX_SAFE_INTEGER;
			return mesh;
		}

		const cube = createPinkCube()
		const animateCube = ()=>{

			setTimeout(()=>{
				requestAnimationFrame(animateCube);
			},500)

			const {longitude, latitude, altitude} = calculatelonlat(this.tle!, new Date())
			console.log(altitude, mapView.disposed)


			const p = GeoCoordinates.fromLatLng({lat: latitude, lng: longitude});
			p.altitude = altitude * 1000;
			cube.anchor = p;

			mapView.update()

		}
		cube.rotateY(0.5);
		const p = GeoCoordinates.fromLatLng({lat: 0, lng: 0});
		p.altitude = 705 * 1000;
		cube.anchor = p;
		animateCube()
		//mapView.mapAnchors.add(curve.ellipse);
		mapView.mapAnchors.add(cube);

		mapView.addEventListener(MapViewEventNames.CameraPositionChanged, (e)=>{
			const zoom = (e as any).zoom;
			this.updateSize(zoom)
		});


		(window as any).camera = mapView.camera;
		(window as any).mapView = mapView;

		this.addMouseEventListener()
		atmosphere.lightMode = AtmosphereLightMode.LightDynamic;
		return mapView;
	}
}

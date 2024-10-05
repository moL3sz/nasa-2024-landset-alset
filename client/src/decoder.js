"use strict";
/*
 * Copyright (C) 2019-2021 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
self.importScripts("three.min.js");
var index_worker_1 = require("@here/harp-vectortile-datasource/index-worker");
index_worker_1.VectorTileDecoderService.start();
index_worker_1.GeoJsonTilerService.start();

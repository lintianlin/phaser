var Formats = require('../../Formats');
var MapData = require('../../mapdata/MapData');
var ParseTilesets = require('./ParseTilesets');
var ParseTileLayers = require('./ParseTileLayers');

/**
 * Parses a Weltmeister JSON object into a new MapData object.
 *
 * @param {string} name - The name of the tilemap, used to set the name on the MapData.
 * @param {object} json - The Weltmeister JSON object.
 * @param {boolean} insertNull - Controls how empty tiles, tiles with an index of -1, in the map
 * data are handled. If `true`, empty locations will get a value of `null`. If `false`, empty
 * location will get a Tile object with an index of -1. If you've a large sparsely populated map and
 * the tile data doesn't need to change then setting this value to `true` will help with memory
 * consumption. However if your map is small or you need to update the tiles dynamically, then leave
 * the default value set.
 */
var ParseWeltmeister = function (name, json, insertNull)
{
    if (json.layer.length === 0)
    {
        console.warn('No layers found in the Weltmeister map: ' + name);
        return null;
    }

    var width = 0;
    var height = 0;
    for (var i = 0; i < json.layer.length; i++)
    {
        if (json.layer[i].width > width) { width = json.layer[i].width; }
        if (json.layer[i].height > height) { height = json.layer[i].height; }
    }

    var mapData = new MapData({
        width: width,
        height: height,
        name: name,
        tileWidth: json.layer[0].tilesize,
        tileHeight: json.layer[0].tilesize,
        format: Formats.WELTMEISTER
    });

    mapData.layers = ParseTileLayers(json, insertNull);
    mapData.tilesets = ParseTilesets(json);

    return mapData;
};

module.exports = ParseWeltmeister;

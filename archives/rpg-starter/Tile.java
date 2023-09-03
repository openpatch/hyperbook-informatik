import org.openpatch.scratch.*;

public class Tile extends Sprite
{
    public static int FLOOR_START_INDEX = 1;
    public static int HOUSE_START_INDEX = 573;
    public static int NATURE_START_INDEX = 1332;
    public static int WATER_START_INDEX = 1668;
    public static int LOGIC_START_INDEX = 2144;
    public static int ELEMENT_START_INDEX = 2224;
    public static int FIELD_START_INDEX = 2464;
    public static int FLOOR_DETAIL_START_INDEX = 2494;
    public static int HOLE_START_INDEX = 2574;
    public static int INTERIOR_FLOOR_START_INDEX = 2629;
    public static int RELIEF_START_INDEX = 3003;
    public static int RELIEF_DETAIL_START_INDEX = 3243;
    public static int WALL_SIMPLE_START_INDEX = 3387;

    public Tile()
    {
        this.addCostume("blank", "assets/Blank.png");
        this.addCostumes("floor", "assets/Tiles/TilesetFloor.png", Game.TILE_SIZE, Game.TILE_SIZE);
        this.addCostumes("house", "assets/Tiles/TilesetHouse.png", Game.TILE_SIZE, Game.TILE_SIZE);
        this.addCostumes("nature", "assets/Tiles/TilesetNature.png", Game.TILE_SIZE, Game.TILE_SIZE);
        this.addCostumes("water", "assets/Tiles/TilesetWater.png", Game.TILE_SIZE, Game.TILE_SIZE);
        this.addCostumes("logic", "assets/Tiles/TilesetLogic.png", Game.TILE_SIZE, Game.TILE_SIZE);
        this.addCostumes("element", "assets/Tiles/TilesetElement.png", Game.TILE_SIZE, Game.TILE_SIZE);
        this.addCostumes("field", "assets/Tiles/TilesetField.png", Game.TILE_SIZE, Game.TILE_SIZE);
        this.addCostumes("floor-detail", "assets/Tiles/TilesetFloorDetail.png", Game.TILE_SIZE, Game.TILE_SIZE);
        this.addCostumes("hole", "assets/Tiles/TilesetHole.png", Game.TILE_SIZE, Game.TILE_SIZE);
        this.addCostumes("interior-floor", "assets/Tiles/TilesetInteriorFloor.png", Game.TILE_SIZE, Game.TILE_SIZE);
        this.addCostumes("relief", "assets/Tiles/TilesetRelief.png", Game.TILE_SIZE, Game.TILE_SIZE);
        this.addCostumes("relief-detail", "assets/Tiles/TilesetReliefDetail.png", Game.TILE_SIZE, Game.TILE_SIZE);
        this.addCostumes("wall-simple", "assets/Tiles/TilesetWallSimple.png", Game.TILE_SIZE, Game.TILE_SIZE);

        this.disableHitbox();
    }
}

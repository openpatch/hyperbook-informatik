import java.time.LocalDateTime;

public class TemperatureChangedEvent extends Event {
    private double oldTemperature;
    private double newTemperature;

    public TemperatureChangedEvent(int pId, LocalDateTime pTimeFired, String pContext, double pOldTemperature, double pNewTemperature) {
        super(pId, pTimeFired, pContext);
        oldTemperature = pOldTemperature;
        newTemperature = pNewTemperature;
    }

    public double getOldTemperature() {
        return oldTemperature;
    }

    public double getNewTemperature() {
        return newTemperature;
    }
}

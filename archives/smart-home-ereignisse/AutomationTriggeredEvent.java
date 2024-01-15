import java.time.LocalDateTime;

public class AutomationTriggeredEvent extends Event {
    private String name;

    public AutomationTriggeredEvent(int pId, LocalDateTime pTimeFired, String pContext, String pName) {
        super(pId, pTimeFired, pContext);
        name = pName;
    }

    public String getName() {
        return name;
    }
}

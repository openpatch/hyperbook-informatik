import java.time.LocalDateTime;

public class StateChangedEvent extends Event {
    private String oldState;
    private String newState;

    public StateChangedEvent(int pId, LocalDateTime pTimeFired, String pContext, String pOldState, String pNewState) {
        super(pId, pTimeFired, pContext);
        oldState = pOldState;
        newState = pNewState;
    }

    public String getOldState() {
        return oldState;
    }

    public String getNewState() {
        return newState;
    }
}

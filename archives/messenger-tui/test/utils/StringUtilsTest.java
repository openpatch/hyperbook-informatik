package utils;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class StringUtilsTest
{
   @Test
   public void testReverse() {
       StringUtils s = new StringUtils();
       s.setWord("Hallo");
       assertEquals(s.reverse(), "ollaH");
   }
   
   @Test
   public void testDistanceTo() {
       StringUtils s = new StringUtils();
       s.setWord("Hallo");
       assertEquals(s.distanceTo("Ballo"), 1);
   }
   
   @Test
   public void TestIsParlindrome() {
       StringUtils s = new StringUtils();
       s.setWord("Hallo");
       assertFalse(s.isParlindrome());
       s.setWord("Anna");
       assertTrue(s.isParlindrome());
   }
}

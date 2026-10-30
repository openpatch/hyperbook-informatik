void main() {
   Weltkarte karte = new Weltkarte();
   karte.untersuche();
}

class Weltkarte {
   private Graph graph = new Graph();

   public Weltkarte() {
      Vertex dorf = new Vertex("Dorf");
      Vertex wald = new Vertex("Wald");
      Vertex burg = new Vertex("Burg");
      graph.addVertex(dorf);
      graph.addVertex(wald);
      graph.addVertex(burg);
      graph.addEdge(new Edge(dorf, wald, 4));
      graph.addEdge(new Edge(wald, burg, 7));
   }

   public void untersuche() {
      graph.setAllVertexMarks(false);
      this.besuche(graph.getVertex("Dorf"));
      IO.println("Alle erreichbar: " + graph.allVerticesMarked());
   }

   private void besuche(Vertex pOrt) {
      if (pOrt.isMarked()) return;
      pOrt.setMark(true);
      IO.println("Erreichbar: " + pOrt.getID());
      List<Vertex> nachbarn = graph.getNeighbours(pOrt);
      nachbarn.toFirst();
      while (nachbarn.hasAccess()) {
         this.besuche(nachbarn.getContent());
         nachbarn.next();
      }
   }
}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import os

app = FastAPI()

# Get CORS origins from environment variable, fallback to localhost for development
cors_origins_env = os.getenv("CORS_ORIGINS", "http://localhost:3000")
cors_origins = [origin.strip() for origin in cors_origins_env.split(",")]

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Edge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class Node(BaseModel):
    id: str
    type: str
    position: Dict
    data: Optional[Dict] = None

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses DFS with recursion stack to detect cycles.
    """
    # Build adjacency list
    adjacency_list: Dict[str, List[str]] = {node['id']: [] for node in nodes}
    
    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in adjacency_list:
            adjacency_list[source].append(target)
    
    # Track visited nodes and recursion stack
    visited = set()
    recursion_stack = set()
    
    def has_cycle(node_id: str) -> bool:
        """DFS helper to detect cycles"""
        visited.add(node_id)
        recursion_stack.add(node_id)
        
        # Check all neighbors
        for neighbor in adjacency_list.get(node_id, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in recursion_stack:
                # Found a back edge (cycle)
                return True
        
        recursion_stack.remove(node_id)
        return False
    
    # Check for cycles starting from each unvisited node
    for node in nodes:
        node_id = node['id']
        if node_id not in visited:
            if has_cycle(node_id):
                return False  # Cycle found, not a DAG
    
    return True  # No cycles found, it's a DAG

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(request: PipelineRequest):
    """
    Parse pipeline and return node count, edge count, and DAG status.
    """
    # Convert Pydantic models to dicts for processing
    nodes = [node.dict() for node in request.nodes]
    edges = [edge.dict() for edge in request.edges]
    
    # Calculate counts
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Check if it's a DAG
    is_dag_result = is_dag(nodes, edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }

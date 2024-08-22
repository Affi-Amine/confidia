import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import ReactFlow, { Background, Controls, Handle } from "reactflow";
import "reactflow/dist/style.css";
import "../../sass/Contents/DocTechnic/TreeStruct.scss";

// JSON
import DataEdges from "../../JSON/TreeStruct/DataEdges.json";
import DataEdgesAdvantages from "../../JSON/TreeStruct/DataEdgesAdvantages.json";
import DataEdgesGlobal from "../../JSON/TreeStruct/DataEdgesGlobal.json";
import DataJsonNodes from "../../JSON/TreeStruct/DataJsonNodes.json";
import DataNodeAdvantages from "../../JSON/TreeStruct/DataNodeAdvantages.json";
import DataNodeGlobal from "../../JSON/TreeStruct/DataNodeGlobal.json";
import newJsonEdgeData from "../../JSON/TreeStruct/newJsonEdgeData.json";
import newJsonNodeData from "../../JSON/TreeStruct/newJsonNodeData.json";

// Composant de nœud personnalisé
const CustomNode = ({ data, onClick }) => {
  let style = {
    padding: 10,
    border: "1px solid #777",
    borderRadius: 5,
    backgroundColor: "#fff",
    position: "relative",
    cursor: "default",
  };
  if (data.type === "folder") {
    style.fontStyle = "italic";
    style.color = "#0c71c3";
    style.border = "2px solid  #0c71c3";
    style.cursor = "pointer";
  }

  return (
    <div style={style} onClick={() => onClick(data)}>
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>{data.label}</div>
      {data.sourcePosition && (
        <Handle
          type="source"
          position={data.sourcePosition}
          style={{ background: "none", border: "none" }}
        />
      )}
      {data.targetPosition && (
        <Handle
          type="target"
          position={data.targetPosition}
          style={{ background: "none", border: "none" }}
        />
      )}
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function TreeStruct() {
  const [bigView, setBigView] = useState(true); // Aggrandir le composant
  const [globalView, setGlobalView] = useState(false); // Voir l'entièreté du projet

  const [GlobalJsonNode, setGlobalJsonNode] = useState(DataNodeGlobal);
  const [GlobalEdge, setGlobalEdge] = useState(DataEdgesGlobal);
  const [initialJsonNode, setInitialJsonNode] = useState(DataJsonNodes);
  const [initialJsonEdge, setInitialJsonEdge] = useState(DataEdges);
  const [newJsonNode, setNewJsonNode] = useState([]);
  const [newJsonEdge, setNewJsonEdge] = useState([]);

  const [history, setHistory] = useState([]);

  const onNodeClick = (node) => {
    if (node.type === "folder" && node.evenClick?.id && !globalView) {
      const currentState = {
        nodes: newJsonNode,
        edges: newJsonEdge,
      };
      setHistory([...history, currentState]);

      if (node.evenClick.id === "newJsonEdge") {
        setNewJsonNode(newJsonNodeData);
        setNewJsonEdge(newJsonEdgeData);
      }
      if (node.evenClick.id === "advantages") {
        setNewJsonNode(DataNodeAdvantages);
        setNewJsonEdge(DataEdgesAdvantages);
      }
    }
  };

  const memoizedNodeTypes = useMemo(
    () => ({
      custom: (props) => <CustomNode {...props} onClick={onNodeClick} />,
    }),
    [history]
  );

  useEffect(() => {
    if (newJsonNode.length === 0) {
      setNewJsonNode(initialJsonNode);
      setNewJsonEdge(initialJsonEdge);
    }
  }, [initialJsonNode, initialJsonEdge]);

  const handleReturnClick = () => {
    const previousState = history.pop();
    if (previousState) {
      setNewJsonNode(previousState.nodes);
      setNewJsonEdge(previousState.edges);
      setHistory([...history]);
    }
  };

  let nodes = globalView
    ? GlobalJsonNode
    : newJsonNode.length === 0
    ? initialJsonNode
    : newJsonNode;
  let edges = globalView
    ? GlobalEdge
    : newJsonNode.length === 0
    ? initialJsonEdge
    : newJsonEdge;

  return (
    <div className="TreeStruct">
      <section className={bigView ? "bigView" : "normalView"}>
        <div className="boxIcons">
          {!globalView && (
            <FontAwesomeIcon
              className="icon return"
              icon="fa-solid fa-arrow-left"
              onClick={handleReturnClick}
              onDoubleClick={() => {
                setNewJsonNode([]);
                setNewJsonEdge([]);
              }}
            />
          )}
          <FontAwesomeIcon
            className="icon global"
            icon="fa-solid fa-sitemap"
            onClick={() => setGlobalView(!globalView)}
          />
          {bigView ? (
            <FontAwesomeIcon
              className="icon arrowUpDown"
              icon="fa-solid fa-minimize"
              onClick={() => setBigView(false)}
            />
          ) : (
            <FontAwesomeIcon
              className="icon arrowUpDown"
              icon="fa-solid fa-maximize"
              onClick={() => setBigView(true)}
            />
          )}
        </div>

        <ReactFlow
          className="ReactFlow"
          nodes={nodes}
          edges={edges}
          nodeTypes={memoizedNodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </section>
    </div>
  );
}

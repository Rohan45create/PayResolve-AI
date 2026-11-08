import React, { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
} from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { EvidenceNode } from './EvidenceNode';
import type { EvidenceNodeData } from './EvidenceNode';
import type { EvidenceGraphDto, EvidenceNodeDto } from '../lib/api';
import { useTheme } from '../lib/theme';

interface EvidenceGraphViewProps {
  graph?: EvidenceGraphDto | null;
  className?: string;
}

const nodeTypes = {
  evidence: EvidenceNode,
};

function formatMinor(minor?: number, _currency = 'USD'): string | undefined {
  if (minor == null) return undefined;
  return `$${(minor / 100).toFixed(2)}`;
}

export const EvidenceGraphView: React.FC<EvidenceGraphViewProps> = ({ graph, className = '' }) => {
  const { isDark } = useTheme();

  // Convert API DTO into React Flow Nodes and Edges
  const { nodes, edges } = useMemo(() => {
    if (!graph || !graph.nodes || graph.nodes.length === 0) {
      // Default canonical fallback graph matching Case PR-0142 design
      const fallbackNodes: Node[] = [
        {
          id: 'order',
          type: 'evidence',
          position: { x: 30, y: 120 },
          data: {
            label: 'PayPal order',
            sublabel: 'approved',
            source: 'PayPal',
            status: 'APPROVED',
          } satisfies EvidenceNodeData,
        },
        {
          id: 'capture',
          type: 'evidence',
          position: { x: 230, y: 50 },
          data: {
            label: 'Capture',
            sublabel: 'COMPLETED',
            source: 'PayPal',
            status: 'COMPLETED',
            amount: '$84.50',
          } satisfies EvidenceNodeData,
        },
        {
          id: 'webhook',
          type: 'evidence',
          position: { x: 230, y: 190 },
          data: {
            label: 'Webhook',
            sublabel: 'delivered twice',
            source: 'PayPal',
            status: 'DELIVERED',
          } satisfies EvidenceNodeData,
        },
        {
          id: 'shop_order',
          type: 'evidence',
          position: { x: 450, y: 100 },
          data: {
            label: 'Shop order #10482',
            sublabel: 'still PENDING',
            source: 'Shop',
            status: 'PENDING',
            amount: '$84.50',
          } satisfies EvidenceNodeData,
        },
        {
          id: 'shipment',
          type: 'evidence',
          position: { x: 450, y: 220 },
          data: {
            label: 'No shipment yet',
            sublabel: 'Unfulfilled',
            source: 'Shop',
            status: 'MISSING',
            isMissing: true,
          } satisfies EvidenceNodeData,
        },
      ];

      const fallbackEdges: Edge[] = [
        { id: 'e1', source: 'order', target: 'capture', type: 'smoothstep', style: { stroke: isDark ? '#64748b' : '#94a3b8', strokeWidth: 1.5 } },
        { id: 'e2', source: 'order', target: 'webhook', type: 'smoothstep', style: { stroke: isDark ? '#64748b' : '#94a3b8', strokeWidth: 1.5 } },
        { id: 'e3', source: 'capture', target: 'webhook', type: 'smoothstep', style: { stroke: isDark ? '#64748b' : '#94a3b8', strokeWidth: 1.5 } },
        {
          id: 'e4',
          source: 'capture',
          target: 'shop_order',
          type: 'smoothstep',
          label: 'missing: PAID update',
          labelStyle: { fill: '#f59e0b', fontSize: 10, fontWeight: 500 },
          labelBgStyle: { fill: isDark ? '#0f172a' : '#ffffff', fillOpacity: 0.9, rx: 4, ry: 4 },
          style: { stroke: '#f59e0b', strokeWidth: 1.5, strokeDasharray: '4 4' },
          markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' },
        },
        {
          id: 'e5',
          source: 'webhook',
          target: 'shipment',
          type: 'smoothstep',
          style: { stroke: isDark ? '#64748b' : '#94a3b8', strokeWidth: 1.5, strokeDasharray: '4 4' },
        },
      ];

      return { nodes: fallbackNodes, edges: fallbackEdges };
    }

    // Dynamic layout generator based on entity source & type
    const xColumns: Record<string, number> = {
      PAYPAL_ORDER: 30,
      PAYPAL_CAPTURE: 230,
      WEBHOOK_EVENT: 230,
      PAYPAL_REFUND: 230,
      SHOP_ORDER: 450,
      SHIPMENT: 450,
      DISPUTE: 230,
      OPERATOR_ACTION: 640,
    };

    const typeCounts: Record<string, number> = {};
    const flowNodes: Node[] = (graph.nodes || []).map((n: EvidenceNodeDto, idx: number) => {
      const nodeType = n.type || 'UNKNOWN';
      const colX = xColumns[nodeType] ?? 230;
      const count = typeCounts[nodeType] || 0;
      typeCounts[nodeType] = count + 1;

      let posY = 120 + (count * 90);
      if (nodeType === 'PAYPAL_CAPTURE') posY = 50 + (count * 80);
      if (nodeType === 'WEBHOOK_EVENT') posY = 190 + (count * 70);
      if (nodeType === 'SHOP_ORDER') posY = 90 + (count * 90);
      if (nodeType === 'SHIPMENT') posY = 220 + (count * 80);

      const isMissing = n.status === 'MISSING' || !!n.isMissing;
      const amountMinor = (n as { amountMinor?: number }).amountMinor ?? (n.metadata?.amountMinor as number | undefined);
      const currency = (n as { currency?: string }).currency ?? (n.metadata?.currency as string | undefined);
      const formattedAmount = formatMinor(amountMinor, currency);

      return {
        id: n.id || `node-${idx}`,
        type: 'evidence',
        position: { x: colX, y: posY },
        data: {
          label: n.label || (n.type ? n.type.replace(/_/g, ' ').toLowerCase() : 'evidence'),
          sublabel: isMissing ? 'MISSING' : (n.status || 'KNOWN'),
          source: n.source,
          status: n.status || (isMissing ? 'MISSING' : 'KNOWN'),
          amount: formattedAmount,
          isMissing,
        } satisfies EvidenceNodeData,
      };
    });

    const flowEdges: Edge[] = (graph.edges || []).map((e, idx) => {
      const isMissing = e.status === 'MISSING' || !!e.isDashed;
      return {
        id: `edge_${e.source}_${e.target}_${idx}`,
        source: e.source || '',
        target: e.target || '',
        type: 'smoothstep',
        label: e.label || (isMissing ? `missing: ${e.type?.toLowerCase() || 'link'}` : undefined),
        labelStyle: isMissing
          ? { fill: '#f59e0b', fontSize: 10, fontWeight: 500 }
          : { fill: isDark ? '#94a3b8' : '#64748b', fontSize: 10 },
        labelBgStyle: { fill: isDark ? '#0f172a' : '#ffffff', fillOpacity: 0.9, rx: 4, ry: 4 },
        style: isMissing
          ? { stroke: '#f59e0b', strokeWidth: 1.5, strokeDasharray: '4 4' }
          : { stroke: isDark ? '#64748b' : '#94a3b8', strokeWidth: 1.5 },
        markerEnd: isMissing ? { type: MarkerType.ArrowClosed, color: '#f59e0b' } : undefined,
      };
    });

    return { nodes: flowNodes, edges: flowEdges };
  }, [graph, isDark]);

  return (
    <div className={`relative w-full h-[360px] bg-[#f1f5f9]/70 dark:bg-[#080d17] rounded-xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
        nodesDraggable
        elementsSelectable
      >
        <Background gap={16} size={1} className="dark:opacity-20 opacity-30" />
        <Controls showInteractive={false} className="!bg-white dark:!bg-[#131b26] !border-slate-200 dark:!border-slate-800 !rounded-lg !shadow-xs" />
      </ReactFlow>
    </div>
  );
};

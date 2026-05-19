import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';

class WarehouseHomeScreen extends StatelessWidget {
  const WarehouseHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('FDS Warehouse'),
        actions: [
          IconButton(icon: const Icon(Icons.notifications_outlined), onPressed: () {}),
          const SizedBox(width: 4),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Greeting
            Text('Buenos días, Carlos', style: theme.textTheme.titleLarge),
            const SizedBox(height: 2),
            Text('Turno: 08:00 – 16:00 · Zona B', style: theme.textTheme.bodySmall),
            const SizedBox(height: 20),

            // KPI cards
            Row(
              children: [
                Expanded(child: _KpiCard(label: 'Órdenes pendientes', value: '24', icon: Icons.inbox_outlined, color: cs.primary)),
                const SizedBox(width: 12),
                Expanded(child: _KpiCard(label: 'Pickeadas hoy', value: '87', icon: Icons.check_circle_outline, color: const Color(0xFF047E48))),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(child: _KpiCard(label: 'En empaque', value: '12', icon: Icons.inventory_2_outlined, color: const Color(0xFFFBBF24))),
                const SizedBox(width: 12),
                Expanded(child: _KpiCard(label: 'Incidencias', value: '2', icon: Icons.warning_amber_outlined, color: const Color(0xFFD72A22))),
              ],
            ),
            const SizedBox(height: 24),

            // Progress bar
            Text('Progreso del turno', style: theme.textTheme.titleMedium),
            const SizedBox(height: 10),
            ClipRRect(
              borderRadius: BorderRadius.circular(6),
              child: LinearProgressIndicator(
                value: 0.63,
                minHeight: 10,
                backgroundColor: const Color(0xFFE7EBEA),
                valueColor: AlwaysStoppedAnimation(cs.primary),
              ),
            ),
            const SizedBox(height: 6),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('87 de 138 órdenes completadas', style: theme.textTheme.bodySmall),
                Text('63%', style: theme.textTheme.labelMedium?.copyWith(color: cs.primary, fontWeight: FontWeight.w700)),
              ],
            ),
            const SizedBox(height: 24),

            // Priority tasks
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Tareas prioritarias', style: theme.textTheme.titleMedium),
                TextButton(onPressed: () {}, child: const Text('Ver todas')),
              ],
            ),
            const SizedBox(height: 8),
            _TaskTile(orderId: '#WH-4821', sku: 'SKU-00192 · 3 uds', zone: 'Zona A · Pasillo 4', priority: 'Alta', priorityColor: const Color(0xFFD72A22)),
            const SizedBox(height: 8),
            _TaskTile(orderId: '#WH-4819', sku: 'SKU-00874 · 1 ud', zone: 'Zona C · Pasillo 2', priority: 'Media', priorityColor: const Color(0xFFFBBF24)),
            const SizedBox(height: 8),
            _TaskTile(orderId: '#WH-4815', sku: 'SKU-00341 · 6 uds', zone: 'Zona B · Pasillo 7', priority: 'Normal', priorityColor: const Color(0xFF047E48)),
            const SizedBox(height: 24),

            // CTA
            FdsButton(
              label: 'Iniciar siguiente tarea',
              fullWidth: true,
              size: FdsButtonSize.lg,
              leadingIcon: const Icon(Icons.play_arrow),
              onPressed: () {},
            ),
            const SizedBox(height: 12),
            FdsButton(
              label: 'Reportar incidencia',
              variant: FdsButtonVariant.ghost,
              fullWidth: true,
              onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }
}

class _KpiCard extends StatelessWidget {
  const _KpiCard({required this.label, required this.value, required this.icon, required this.color});
  final String label;
  final String value;
  final IconData icon;
  final Color color;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: color, size: 18),
                const Spacer(),
                Text(value, style: theme.textTheme.titleLarge?.copyWith(color: color, fontSize: 24)),
              ],
            ),
            const SizedBox(height: 6),
            Text(label, style: theme.textTheme.bodySmall),
          ],
        ),
      ),
    );
  }
}

class _TaskTile extends StatelessWidget {
  const _TaskTile({required this.orderId, required this.sku, required this.zone, required this.priority, required this.priorityColor});
  final String orderId;
  final String sku;
  final String zone;
  final String priority;
  final Color priorityColor;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(orderId, style: theme.textTheme.titleSmall?.copyWith(color: theme.textTheme.bodyLarge?.color, fontWeight: FontWeight.w700)),
                  const SizedBox(height: 2),
                  Text(sku, style: theme.textTheme.bodySmall),
                  const SizedBox(height: 2),
                  Row(children: [
                    const Icon(Icons.location_on_outlined, size: 12, color: Color(0xFF63767A)),
                    const SizedBox(width: 2),
                    Text(zone, style: theme.textTheme.labelSmall),
                  ]),
                ],
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: priorityColor.withOpacity(0.12),
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(priority, style: TextStyle(color: priorityColor, fontSize: 11, fontWeight: FontWeight.w600)),
            ),
            const SizedBox(width: 8),
            const Icon(Icons.chevron_right, color: Color(0xFF90A3A3)),
          ],
        ),
      ),
    );
  }
}

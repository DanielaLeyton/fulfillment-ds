import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';

const _stops = [
  _Stop(1, 'Calle Morelos 45, Col. Centro', 'Juan Pérez', '2 paquetes', '10:32', 'done'),
  _Stop(2, 'Av. Reforma 800, Cuauhtémoc', 'Ana García', '1 paquete', '11:15', 'done'),
  _Stop(3, 'Insurgentes Sur 1234, Del Valle', 'María López', '2 paquetes', '14:20', 'next'),
  _Stop(4, 'Blvd. M. Ávila 56, Coyoacán', 'Roberto Cruz', '3 paquetes', '15:00', 'pending'),
  _Stop(5, 'Periférico Sur 2900, Pedregal', 'Laura Díaz', '1 paquete', '15:45', 'pending'),
];

class _Stop {
  const _Stop(this.number, this.address, this.name, this.packages, this.time, this.status);
  final int number;
  final String address, name, packages, time, status;
}

class RouteScreen extends StatelessWidget {
  const RouteScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Mi ruta'),
        actions: [
          TextButton.icon(
            onPressed: () {},
            icon: const Icon(Icons.map_outlined, color: Colors.white70),
            label: const Text('Ver mapa', style: TextStyle(color: Colors.white70)),
          ),
        ],
      ),
      body: Column(
        children: [
          // Route summary bar
          Container(
            color: const Color(0xFF232D34),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(children: [
              _SummaryChip(Icons.check_circle_outline, '2 entregados', const Color(0xFF047E48)),
              const SizedBox(width: 12),
              _SummaryChip(Icons.access_time_outlined, '3 pendientes', cs.primary),
              const SizedBox(width: 12),
              _SummaryChip(Icons.route_outlined, '~45 km', Colors.white60),
            ]),
          ),

          // Stop list
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.all(16),
              itemCount: _stops.length,
              separatorBuilder: (_, __) => const SizedBox(height: 10),
              itemBuilder: (ctx, i) => _StopCard(stop: _stops[i]),
            ),
          ),
        ],
      ),
    );
  }
}

class _SummaryChip extends StatelessWidget {
  const _SummaryChip(this.icon, this.label, this.color);
  final IconData icon;
  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Row(children: [
      Icon(icon, color: color, size: 14),
      const SizedBox(width: 4),
      Text(label, style: TextStyle(color: color, fontSize: 12, fontWeight: FontWeight.w500)),
    ]);
  }
}

class _StopCard extends StatelessWidget {
  const _StopCard({required this.stop});
  final _Stop stop;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;
    final isNext = stop.status == 'next';
    final isDone = stop.status == 'done';

    final borderColor = isNext ? cs.primary : (isDone ? const Color(0xFF047E48) : const Color(0xFFE7EBEA));

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: borderColor, width: isNext ? 2 : 1),
      ),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(children: [
              Container(
                width: 28, height: 28,
                decoration: BoxDecoration(
                  color: isDone ? const Color(0xFF047E48) : isNext ? cs.primary : const Color(0xFFE7EBEA),
                  shape: BoxShape.circle,
                ),
                child: Center(
                  child: isDone
                      ? const Icon(Icons.check, color: Colors.white, size: 16)
                      : Text('${stop.number}', style: TextStyle(color: isDone || isNext ? Colors.white : const Color(0xFF63767A), fontSize: 12, fontWeight: FontWeight.w700)),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(child: Text(stop.name, style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700, color: theme.textTheme.bodyLarge?.color))),
              Text(stop.time, style: theme.textTheme.labelSmall),
            ]),
            const SizedBox(height: 8),
            Row(children: [
              const Icon(Icons.location_on_outlined, size: 14, color: Color(0xFF63767A)),
              const SizedBox(width: 4),
              Expanded(child: Text(stop.address, style: theme.textTheme.bodySmall)),
            ]),
            const SizedBox(height: 2),
            Row(children: [
              const Icon(Icons.inventory_2_outlined, size: 14, color: Color(0xFF63767A)),
              const SizedBox(width: 4),
              Text(stop.packages, style: theme.textTheme.bodySmall),
            ]),
            if (isNext) ...[
              const SizedBox(height: 12),
              Row(children: [
                Expanded(child: FdsButton(label: 'Navegar', leadingIcon: const Icon(Icons.navigation_outlined), onPressed: () {})),
                const SizedBox(width: 8),
                FdsButton(label: 'Confirmar', variant: FdsButtonVariant.ghost, onPressed: () {}),
              ]),
            ],
          ],
        ),
      ),
    );
  }
}

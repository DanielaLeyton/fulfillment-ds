import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';

const _packages = [
  _Package('PKG-001', 'María López', 'Insurgentes Sur 1234', 'Caja mediana', 'pendiente'),
  _Package('PKG-002', 'María López', 'Insurgentes Sur 1234', 'Sobre', 'pendiente'),
  _Package('PKG-003', 'Roberto Cruz', 'Blvd. M. Ávila 56', 'Caja grande', 'pendiente'),
  _Package('PKG-004', 'Roberto Cruz', 'Blvd. M. Ávila 56', 'Caja pequeña', 'pendiente'),
  _Package('PKG-005', 'Laura Díaz', 'Periférico Sur 2900', 'Sobre express', 'pendiente'),
  _Package('PKG-006', 'Juan Pérez', 'Calle Morelos 45', 'Caja mediana', 'entregado'),
  _Package('PKG-007', 'Ana García', 'Av. Reforma 800', 'Caja pequeña', 'entregado'),
];

class _Package {
  const _Package(this.id, this.recipient, this.address, this.type, this.status);
  final String id, recipient, address, type, status;
}

class PackagesScreen extends StatefulWidget {
  const PackagesScreen({super.key});

  @override
  State<PackagesScreen> createState() => _PackagesScreenState();
}

class _PackagesScreenState extends State<PackagesScreen> {
  String _filter = 'todos';

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;

    final shown = _filter == 'todos'
        ? _packages
        : _packages.where((p) => p.status == _filter).toList();

    return Scaffold(
      appBar: AppBar(title: const Text('Paquetes'), actions: [
        IconButton(icon: const Icon(Icons.search), onPressed: () {}),
      ]),
      body: Column(
        children: [
          // Filter chips
          Container(
            color: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            child: Row(children: [
              _FilterChip('Todos (${_packages.length})', 'todos', _filter, (v) => setState(() => _filter = v)),
              const SizedBox(width: 8),
              _FilterChip('Pendientes (${_packages.where((p) => p.status == 'pendiente').length})', 'pendiente', _filter, (v) => setState(() => _filter = v)),
              const SizedBox(width: 8),
              _FilterChip('Entregados (${_packages.where((p) => p.status == 'entregado').length})', 'entregado', _filter, (v) => setState(() => _filter = v)),
            ]),
          ),
          const Divider(height: 1),

          // Package list
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.all(16),
              itemCount: shown.length,
              separatorBuilder: (_, __) => const SizedBox(height: 8),
              itemBuilder: (ctx, i) => _PackageCard(pkg: shown[i]),
            ),
          ),
        ],
      ),
    );
  }
}

class _FilterChip extends StatelessWidget {
  const _FilterChip(this.label, this.value, this.selected, this.onSelected);
  final String label, value, selected;
  final ValueChanged<String> onSelected;

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final isSelected = value == selected;
    return GestureDetector(
      onTap: () => onSelected(value),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? cs.primary : const Color(0xFFE7EBEA),
          borderRadius: BorderRadius.circular(6),
        ),
        child: Text(label, style: TextStyle(color: isSelected ? Colors.white : const Color(0xFF37474F), fontSize: 12, fontWeight: FontWeight.w500)),
      ),
    );
  }
}

class _PackageCard extends StatelessWidget {
  const _PackageCard({required this.pkg});
  final _Package pkg;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;
    final isDone = pkg.status == 'entregado';

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: (isDone ? const Color(0xFF047E48) : cs.primary).withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(isDone ? Icons.check_circle : Icons.inventory_2_outlined,
                  color: isDone ? const Color(0xFF047E48) : cs.primary, size: 22),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  Text(pkg.id, style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700, color: theme.textTheme.bodyLarge?.color)),
                  const Spacer(),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: isDone ? const Color(0xFFE8F6EE) : cs.primary.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(pkg.status, style: TextStyle(color: isDone ? const Color(0xFF047E48) : cs.primary, fontSize: 10, fontWeight: FontWeight.w600)),
                  ),
                ]),
                Text(pkg.recipient, style: theme.textTheme.bodyMedium),
                Text(pkg.type, style: theme.textTheme.bodySmall),
              ]),
            ),
          ],
        ),
      ),
    );
  }
}

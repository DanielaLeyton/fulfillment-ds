import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';

const _tasks = [
  _Task('#WH-4821', 'SKU-00192', 'Caja mediana × 3', 'Zona A · Pasillo 4 · Estante 2', 'picking', 'Alta'),
  _Task('#WH-4819', 'SKU-00874', 'Bolsa plástica × 1', 'Zona C · Pasillo 2 · Estante 5', 'picking', 'Media'),
  _Task('#WH-4815', 'SKU-00341', 'Pallet × 6', 'Zona B · Pasillo 7 · Estante 1', 'packing', 'Normal'),
  _Task('#WH-4808', 'SKU-01023', 'Caja grande × 2', 'Zona A · Pasillo 1 · Estante 3', 'packing', 'Normal'),
  _Task('#WH-4801', 'SKU-00567', 'Sobre × 10', 'Zona D · Pasillo 3 · Estante 4', 'done', 'Normal'),
  _Task('#WH-4795', 'SKU-00234', 'Caja pequeña × 4', 'Zona B · Pasillo 6 · Estante 2', 'done', 'Media'),
];

class _Task {
  const _Task(this.id, this.sku, this.desc, this.location, this.status, this.priority);
  final String id, sku, desc, location, status, priority;
}

class TasksScreen extends StatefulWidget {
  const TasksScreen({super.key});

  @override
  State<TasksScreen> createState() => _TasksScreenState();
}

class _TasksScreenState extends State<TasksScreen> with SingleTickerProviderStateMixin {
  late final TabController _tabs = TabController(length: 3, vsync: this);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Tareas'),
        bottom: TabBar(
          controller: _tabs,
          labelColor: Colors.white,
          unselectedLabelColor: Colors.white60,
          indicatorColor: cs.primary,
          tabs: const [
            Tab(text: 'Pendientes'),
            Tab(text: 'En proceso'),
            Tab(text: 'Completadas'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabs,
        children: [
          _TaskList(tasks: _tasks.where((t) => t.status == 'picking').toList()),
          _TaskList(tasks: _tasks.where((t) => t.status == 'packing').toList()),
          _TaskList(tasks: _tasks.where((t) => t.status == 'done').toList()),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _tabs.dispose();
    super.dispose();
  }
}

class _TaskList extends StatelessWidget {
  const _TaskList({required this.tasks});
  final List<_Task> tasks;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    if (tasks.isEmpty) {
      return Center(child: Text('Sin tareas', style: theme.textTheme.bodyMedium?.copyWith(color: const Color(0xFF63767A))));
    }
    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: tasks.length,
      separatorBuilder: (_, __) => const SizedBox(height: 10),
      itemBuilder: (ctx, i) => _TaskCard(task: tasks[i]),
    );
  }
}

class _TaskCard extends StatelessWidget {
  const _TaskCard({required this.task});
  final _Task task;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;
    final isDone = task.status == 'done';

    final priorityColor = switch (task.priority) {
      'Alta'  => const Color(0xFFD72A22),
      'Media' => const Color(0xFFFBBF24),
      _       => const Color(0xFF047E48),
    };

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(children: [
              Text(task.id, style: theme.textTheme.titleMedium?.copyWith(decoration: isDone ? TextDecoration.lineThrough : null)),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: priorityColor.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(task.priority, style: TextStyle(color: priorityColor, fontSize: 11, fontWeight: FontWeight.w600)),
              ),
            ]),
            const SizedBox(height: 6),
            Text(task.desc, style: theme.textTheme.bodyMedium),
            Text(task.sku, style: theme.textTheme.bodySmall),
            const SizedBox(height: 8),
            Row(children: [
              const Icon(Icons.location_on_outlined, size: 14, color: Color(0xFF63767A)),
              const SizedBox(width: 4),
              Text(task.location, style: theme.textTheme.bodySmall),
            ]),
            if (!isDone) ...[
              const SizedBox(height: 12),
              FdsButton(label: 'Iniciar tarea', fullWidth: true, onPressed: () {}),
            ],
          ],
        ),
      ),
    );
  }
}

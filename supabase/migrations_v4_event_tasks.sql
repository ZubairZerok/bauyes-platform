-- Add event_id to tasks table to link tasks to specific events
ALTER TABLE tasks
ADD COLUMN event_id uuid REFERENCES events(id) ON DELETE CASCADE;

-- Create index for faster lookups
CREATE INDEX idx_tasks_event_id ON tasks(event_id);

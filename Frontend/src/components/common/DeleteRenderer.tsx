import { CustomCellRendererProps } from "ag-grid-react";
import { MdDelete } from "react-icons/md";

interface DeleteCellRendererProps extends CustomCellRendererProps {
  onDelete: ({ id }: { id: number }) => Promise<void>;
}

export default function DeleteCellRenderer(props: DeleteCellRendererProps) {
  const { value, data, onDelete } = props;
  return (
    <button>
      <MdDelete size={20} onClick={() => onDelete({ id: data.id })} />
    </button>
  );
}

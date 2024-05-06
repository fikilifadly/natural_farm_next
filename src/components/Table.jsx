import { getCurrentDataAttribute, getCurrentTotalPrice, getIndexCategory, rupiahFormat } from "@/utils";

const Table = ({ fields, data, loading, idModal, getDataByIdHandler }) => {
	const ctaHandler = (e) => {
		const { id, action } = e.target.dataset;

		getDataByIdHandler(id);
		if (action === "edit") {
			showModalHandler();
		} else {
			showModalHandler(idModal);
		}
	};

	return (
		<div className="overflow-x-auto">
			<table className="table table-zebra">
				{/* head */}
				<thead>
					<tr>
						<th>No</th>
						{fields?.map((field) => (
							<th key={field.name}>{field.name}</th>
						))}
						<th>Total</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{!loading &&
						data?.length > 0 &&
						data.map((item, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								{fields.map((field, i) => (
									<>
										<td key={index}>
											{field.name == "Customer" && getCurrentDataAttribute(field.name, item, "label")}
											{field.name == "Product" || (field.name == "Payment" && getCurrentDataAttribute(field.name, item, "name"))}
											{field.name != "Product" && field.name != "Customer" && field.name != "Payment" && item[field.name]}
										</td>
									</>
								))}
								<td>{rupiahFormat(getCurrentTotalPrice("Product", item, item["Quantity"], item["Discount"], item["SpecialDiscount"]))}</td>
								<td>
									<div className="flex gap-3">
										<button className="bg-yellow-400 px-5 py-2 rounded-md text-xs" data-id={item.id} data-action={"edit"} onClick={ctaHandler}>
											Edit
										</button>
										<button className="bg-red-600 px-5 py-2 rounded-md text-xs text-white" data-id={item.id} data-action={"delete"} onClick={ctaHandler}>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}

					{!loading && data?.length == 0 && (
						<tr>
							<td colSpan={fields.length + 2} className="text-center">
								No Data Available
							</td>
						</tr>
					)}

					{loading && (
						<tr>
							<td colSpan={fields.length + 2}>
								<div className="flex justify-center items ceter">
									<span className="loading loading-spinner w-[500px] h-[500px]"></span>
								</div>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Table;

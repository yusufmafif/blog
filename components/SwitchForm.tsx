"use client";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import React from "react";

export default function SwitchForm({
	checked,
	onToggle,
	name,
}: {
	checked: boolean;
	onToggle: () => Promise<string>;
	name: string;
}) {
	const handleonSubmit = async (e: any) => {
		e.preventDefault();
		const { error } = JSON.parse(await onToggle());
		if (!error) {
			toast({
				title: 'Successfully update' + name,
			});
		}
	};
	return (
		<form onSubmit={handleonSubmit}>
			<Switch type="submit" checked={checked} className="bg-green-500" />
		</form>
	);
}